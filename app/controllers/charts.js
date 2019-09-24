import Controller from '@ember/controller';

export default Controller.extend({
  createNewChart(title) {
    const newRecord = this.store.createRecord('chart', { title, progress: 0 });
    newRecord.save();
  },

  actions: {
    createNewChart(title) {
      this.createNewChart(title);
    }
  }
});
