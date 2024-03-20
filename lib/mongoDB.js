import mongoose from 'mongoose';
import chalk from 'chalk';

const { Schema, model: _model } = mongoose;
const defaultOptions = { useNewUrlParser: true, useUnifiedTopology: true };

export class mongoDB {
    constructor(url, options = defaultOptions) {
        this.url = url;
        this.options = options;
        this.data = this._data = {};
        this._schema = {};
        this._model = {};
        this.db = null;
        this.connect();
    }

    connect() {
        this.db = mongoose.createConnection(this.url, { ...this.options });
        this.db.on('error', (err) => console.error(chalk.red(`MongoDB connection error: ${err}`)));
        this.db.once('open', () => console.log(chalk.green('MongoDB connection successful')));
    }

    async read() {
        try {
            console.log(chalk.yellow('Reading data...'));
            await this.db;
            const schema = this._schema = new Schema({ data: { type: Object, required: true, default: {} } });
            this._model = this.db.model('data', schema);
            this._data = await this._model.findOne({});
            this.data = this._data?.data ?? {};
            if (!this._data) {
                const [_ignored, _data] = await Promise.all([this.write(this.data), this._model.findOne({})]);
                this._data = _data;
                this.data = this._data?.data ?? {};
            }
            console.log(chalk.green('Read successful'));
            return this.data;
        } catch (error) {
            console.error(chalk.red(`Read error: ${error}`));
        }
    }

    write(data) {
        return new Promise(async (resolve, reject) => {
            try {
                // console.log(chalk.yellow('Writing data...'));
                if (!data) throw new Error('Invalid data');
                const savedData = !this._data ? await (new this._model({ data })).save() : await this._model.findOneAndUpdate({ _id: this._data?._id }, { data }, { new: true });
                this.data = savedData?.data ?? {};
                // console.log(chalk.green('Write successful'));
                resolve(savedData);
            } catch (error) {
                console.error(chalk.red(`Write error: ${error}`));
                reject(error);
            }
        });
    }
}

export class mongoDBV2 {
    constructor(url, options = defaultOptions) {
        this.url = url;
        this.options = options;
        this.models = [];
        this.data = {};
        this.lists;
        this.list;
        this.db = null;
        this.connect();
    }

    connect() {
        this.db = mongoose.createConnection(this.url, { ...this.options });
        this.db.on('error', (err) => console.error(chalk.red(`MongoDBV2 connection error: ${err}`)));
        this.db.once('open', () => console.log(chalk.green('MongoDBV2 connection successful')));
    }

    async read() {
        try {
            console.log(chalk.yellow('Reading data...'));
            await this.db;
            const schema = new Schema({ data: [{ name: String }] });
            this.list = this.db.model('lists', schema);
            this.lists = await this.list.findOne({});
            if (!this.lists?.data) {
                await this.list.create({ data: [] });
                this.lists = await this.list.findOne({});
            }
            const garbage = [];
            for (const { name } of this.lists?.data ?? []) {
                let collection;
                try {
                    collection = this.db.model(name, new Schema({ data: Array }));
                } catch (e) {
                    console.error(e);
                    try {
                        collection = this.db.model(name);
                    } catch (e) {
                        garbage.push(name);
                        console.error(e);
                    }
                }
                if (collection) {
                    this.models.push({ name, model: collection });
                    const collectionsData = await collection.find({});
                    this.data[name] = Object.fromEntries(collectionsData.map(v => v.data));
                }
            }
            try {
                const updatedList = await this.list.findOneAndUpdate({ _id: this.lists?._id }, { data: this.lists.data.filter(v => !garbage.includes(v.name)) }, { new: true });
                if (!updatedList) throw new Error('List not found');
            } catch (e) {
                console.error(e);
            }
            console.log(chalk.green('Read successful'));
            return this.data;
        } catch (error) {
            console.error(chalk.red(`Read error: ${error}`));
        }
    }

    write(data) {
        return new Promise(async (resolve, reject) => {
            try {
                // console.log(chalk.yellow('Writing data...'));
                if (!this.lists || !data) throw new Error('Invalid data or lists');
                const listDoc = [];
                for (const key of Object.keys(data)) {
                    const index = this.models.findIndex(v => v.name === key);
                    const doc = index !== -1 ? this.models[index].model : this.db.model(key, new Schema({ data: Array }));
                    this.models[index === -1 ? this.models.length : index] = { name: key, model: doc };
                    const docData = Object.entries(data[key]).map(v => ({ data: v }));
                    await doc.deleteMany().catch(console.error);
                    await doc.insertMany(docData);
                    if (doc && key) listDoc.push({ name: key });
                }
                const listDocData = listDoc.map(doc => ({ ...doc, _id: doc._id || new mongoose.Types.ObjectId() }));
                const updatedList = await this.list.findOneAndUpdate({ _id: this.lists?._id }, { data: listDocData }, { new: true });
                if (!updatedList) throw new Error('List not found');
                // console.log(chalk.green('Write successful'));
                resolve(true);
            } catch (error) {
                console.error(chalk.red(`Write error: ${error}`));
                reject(error);
            }
        });
    }
}
