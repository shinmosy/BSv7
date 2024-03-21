import mongoose from 'mongoose';
import Promise from 'bluebird';
import chalk from 'chalk';

mongoose.Promise = Promise;

const { STATES, Schema } = mongoose;
const defaultOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

export class mongoDB {
  constructor(url, options = defaultOptions) {
    this.url = url;
    this.options = options;
    this.data = {};
    this._schema = {};
    this._model = {};
    this.db = null;
    this.connectDB();

    this.delete = {
      collection: async (collectionName) => {
        try {
          await this.db.dropCollection(collectionName);
          console.log(chalk.bgGreen.black(`Collection '${collectionName}' deleted successfully`));
        } catch (error) {
          console.error(chalk.bgRed.black(`Error deleting collection '${collectionName}': ${error}`));
        }
      }
    };
    this.schema = mongoose.Schema;
    this.collection = mongoose.model;
  }

  async connectDB() {
    this.db = await mongoose.createConnection(this.url, { ...this.options });
    const status = this.db.readyState;
    const statusMessages = {
      [STATES.connecting]: chalk.bgBlue.black('MongoDB connecting...'),
      [STATES.connected]: chalk.bgGreen.black('MongoDB connected'),
      [STATES.disconnecting]: chalk.bgYellow.black('MongoDB disconnecting...'),
      [STATES.disconnected]: chalk.bgRed.black('MongoDB disconnected')
    };
    console.log(statusMessages[status] || chalk.bgRed.black('Unknown MongoDB state'));
  }

  async read() {
    try {
      const schema = this._schema = new Schema({ data: { type: Object, required: true, default: {} } });
      this._model = await this.db.model('data', schema);
      this._data = await this._model.findOne({});
      this.data = (this._data?.data) ? this._data.data : {};
      if (!this._data) {
        const [_ignored, _data] = await Promise.all([this.write(this.data), this._model.findOne({})]);
        this._data = _data;
        this.data = (this._data?.data) ? this._data.data : {};
      }
      console.log(chalk.bgGreen.black('Read successful'));
      return this.data;
    } catch (error) {
      console.error(chalk.bgRed.black(`Read error: ${error}`));
    }
  }

  async write(data) {
    try {
      if (!data) throw new Error('Invalid data');
      const savedData = !this._data ? await (new this._model({ data })).save() : await this._model.findOneAndUpdate({ _id: this._data?._id }, { data }, { new: true });
      this.data = (savedData?.data) ? savedData.data : {};
      return savedData;
    } catch (error) {
      console.error(chalk.bgRed.black(`Write error: ${error}`));
      throw error;
    }
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
    this.connectDB();

    this.delete = {
      collection: async (collectionName) => {
        try {
          await this.db.dropCollection(collectionName);
          console.log(chalk.bgGreen.black(`Collection '${collectionName}' deleted successfully`));
        } catch (error) {
          console.error(chalk.bgRed.black(`Error deleting collection '${collectionName}': ${error}`));
        }
      }
    };
    this.schema = mongoose.Schema;
    this.collection = mongoose.model;
  }

  async connectDB() {
    this.db = await mongoose.createConnection(this.url, { ...this.options });
    const status = this.db.readyState;
    const statusMessages = {
      [STATES.connecting]: chalk.bgBlue.black('MongoDB connecting...'),
      [STATES.connected]: chalk.bgGreen.black('MongoDB connected'),
      [STATES.disconnecting]: chalk.bgYellow.black('MongoDB disconnecting...'),
      [STATES.disconnected]: chalk.bgRed.black('MongoDB disconnected')
    };
    console.log(statusMessages[status] || chalk.bgRed.black('Unknown MongoDB state'));
  }

  async read() {
    try {
      const schema = new Schema({ data: [{ name: String }] });
      this.list = await this.db.model('lists', schema);
      this.lists = await this.list.findOne({});
      if (!this.lists?.data) {
        await this.list.create({ data: [] });
        this.lists = await this.list.findOne({});
      }
      const garbage = [];
      for (const { name } of this.lists?.data || []) {
        let collection;
        try {
          collection = await this.db.model(name, new Schema({ data: Array }));
        } catch (e) {
          console.error(e);
          try {
            collection = await this.db.model(name);
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
      console.log(chalk.bgGreen.black('Read successful'));
      return this.data;
    } catch (error) {
      console.error(chalk.bgRed.black(`Read error: ${error}`));
    }
  }

  async write(data) {
    try {
      if (!this.lists || !data) throw new Error('Invalid data or lists');
      const listDoc = [];
      for (const key of Object.keys(data)) {
        const index = this.models.findIndex(v => v.name === key);
        const doc = index !== -1 ? this.models[index].model : await this.db.model(key, new Schema({ data: Array }));
        this.models[index === -1 ? this.models.length : index] = { name: key, model: doc };
        const docData = Object.entries(data[key]).map(v => ({ data: v }));
        await doc.deleteMany().catch(console.error);
        await doc.insertMany(docData);
        if (doc && key) listDoc.push({ name: key });
      }
      const listDocData = listDoc.map(doc => ({ ...doc, _id: doc._id || new mongoose.Types.ObjectId() }));
      const updatedList = await this.list.findOneAndUpdate({ _id: this.lists?._id }, { data: listDocData }, { new: true });
      if (!updatedList) throw new Error('List not found');
      return true;
    } catch (error) {
      console.error(chalk.bgRed.black(`Write error: ${error}`));
      throw error;
    }
  }
}
