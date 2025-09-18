import Adapter from '@ember-data/adapter';

export default class ApplicationAdapter extends Adapter {
  generateIdForRecord() {
    return Math.random().toString(36).substr(2, 9);
  }

  findAll(store, type) {
    let records = JSON.parse(localStorage.getItem(type.modelName)) || [];
    return Promise.resolve(records);
  }

  findRecord(store, type, id) {
    let records = JSON.parse(localStorage.getItem(type.modelName)) || [];
    return Promise.resolve(records.find(r => r.id === id));
  }

  createRecord(store, type, snapshot) {
    let data = snapshot.attributes();
    data.id = this.generateIdForRecord();

    let records = JSON.parse(localStorage.getItem(type.modelName)) || [];
    records.push(data);
    localStorage.setItem(type.modelName, JSON.stringify(records));

    return Promise.resolve(data);
  }

  updateRecord(store, type, snapshot) {
    console.log('updateRecord called');
    let data = snapshot.attributes();
    data.id = snapshot.id;

    let records = JSON.parse(localStorage.getItem(type.modelName)) || [];
    let index = records.findIndex(r => r.id === data.id);
    if (index > -1) records[index] = data;
    localStorage.setItem(type.modelName, JSON.stringify(records));
    console.log('Record updated:', records);
    return Promise.resolve(data);
  }

  deleteRecord(store, type, snapshot) {
    let id = snapshot.id;
    let records = JSON.parse(localStorage.getItem(type.modelName)) || [];
    records = records.filter(r => r.id !== id);
    localStorage.setItem(type.modelName, JSON.stringify(records));

    return Promise.resolve();
  }
}