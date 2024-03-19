import mongoose from 'mongoose'
import chalk from 'chalk'

const { Schema, connect, model: _model } = mongoose
const defaultOptions = { useNewUrlParser: true, useUnifiedTopology: true }

export class mongoDB {
    constructor(url, options = defaultOptions) {
        this.url = url
        this.options = options
        this.data = {}
        this._schema = {}
        this._model = {}
        this.db = connect(this.url, { ...this.options }).catch(err => {
            console.error(chalk.red(`MongoDB connection error: ${err.message}`))
        })
    }

    async read() {
        try {
            this.conn = await this.db
            console.log(chalk.green('MongoDB connection successful.'))
            let schema = this._schema = new Schema({
                data: { type: Object, required: true, default: {} }
            })
            this._model = _model('data', schema)
            console.log(chalk.green('MongoDB model created.'))
            this._data = await this._model.findOne({})
            if (!this._data) {
                this.data = {}
                console.log(chalk.yellow('No data found.'))
                const [_data] = await Promise.all([this.write(this.data), this._model.findOne({})])
                this._data = _data
                console.log(chalk.green('Data initialized.'))
            } else {
                this.data = this._data.data
                console.log(chalk.green('Data loaded successfully.'))
            }
            return this.data
        } catch (error) {
            console.error(chalk.red(`Error in MongoDB read operation: ${error.message}`))
            return null
        }
    }

    write(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data) throw new Error('Data is required.')
                console.log(chalk.green('Writing data to MongoDB...'))
                if (!this._data) return resolve((new this._model({ data })).save())
                this._model.findById(this._data._id, (err, docs) => {
                    if (err) throw err
                    if (!docs.data) docs.data = {}
                    docs.data = data
                    return docs.save(resolve)
                })
            } catch (error) {
                console.error(chalk.red(`Error in MongoDB write operation: ${error.message}`))
                reject(error)
            }
        })
    }
}

export class mongoDBV2 {
    constructor(url, options = defaultOptions) {
        this.url = url
        this.options = options
        this.models = []
        this.data = {}
        this.list
        this.db = connect(this.url, { ...this.options }).catch(err => {
            console.error(chalk.red(`MongoDBV2 connection error: ${err.message}`))
        })
    }

    async read() {
        try {
            this.conn = await this.db
            console.log(chalk.green('MongoDBV2 connection successful.'))
            let schema = new Schema({ data: [{ name: String }] })
            this.list = _model('lists', schema)
            console.log(chalk.green('MongoDBV2 model created.'))
            this.lists = await this.list.findOne({})
            if (!this.lists?.data) {
                await this.list.create({ data: [] })
                this.lists = await this.list.findOne({})
                console.log(chalk.yellow('No data found in lists.'))
            }
            let garbage = []
            for (let { name } of this.lists.data) {
                let collection
                try { collection = _model(name, new Schema({ data: Array })) }
                catch (e) { console.error(chalk.red(`Error creating collection schema: ${e.message}`)); collection = _model(name) }
                if (collection) {
                    this.models.push({ name, model: collection })
                    let collectionsData = await collection.find({})
                    this.data[name] = Object.fromEntries(collectionsData.map(v => v.data))
                }
            }
            try {
                let del = await this.list.findById(this.lists._id)
                del.data = del.data.filter(v => !garbage.includes(v.name))
                await del.save()
                console.log(chalk.green('Lists cleaned successfully.'))
            } catch (e) { console.error(chalk.red(`Error deleting list: ${e.message}`)) }
            return this.data
        } catch (error) {
            console.error(chalk.red(`Error in MongoDBV2 read operation: ${error.message}`))
            return null
        }
    }

    write(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.lists || !data) throw new Error('Lists or data is missing.')
                console.log(chalk.green('Writing data to MongoDBV2...'))
                let collections = Object.keys(data), listDoc = [], index = 0
                for (let key of collections) {
                    if ((index = this.models.findIndex(v => v.name === key)) !== -1) {
                        let doc = this.models[index].model
                        await doc.deleteMany().catch(err => console.error(chalk.red(`Error deleting documents: ${err.message}`)))
                        await doc.insertMany(Object.entries(data[key]).map(v => ({ data: v })))
                        if (doc && key) listDoc.push({ name: key })
                    } else {
                        let schema = new Schema({ data: Array }), doc
                        try { doc = _model(key, schema) }
                        catch (e) { console.error(chalk.red(`Error creating collection schema: ${e.message}`)); doc = _model(key) }
                        index = this.models.findIndex(v => v.name === key)
                        this.models[index === -1 ? this.models.length : index] = { name: key, model: doc }
                        await doc.insertMany(Object.entries(data[key]).map(v => ({ data: v })))
                        if (doc && key) listDoc.push({ name: key })
                    }
                }
                this.list.findById(this.lists._id, function (err, doc) {
                    if (err) throw err
                    doc.data = listDoc
                    return doc.save(resolve)
                })
                console.log(chalk.green('Data written successfully to MongoDBV2.'))
                return resolve(true)
            } catch (error) {
                console.error(chalk.red(`Error in MongoDBV2 write operation: ${error.message}`))
                reject(error)
            }
        })
    }
}
