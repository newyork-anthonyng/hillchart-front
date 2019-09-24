import Controller from '@ember/controller';

export default Controller.extend({
  createNewChart(title) {
    const newRecord = this.store.createRecord('chart', { title, progress: 0 });
    newRecord.save();
  },

  deleteChart(id) {
    this.store.findRecord('chart', id, { backgroundReload: false }).then(chart => {
      chart.destroyRecord();
    });
  },

  actions: {
    createNewChart(title) {
      this.createNewChart(title);
    },

    deleteChart(id) {
      this.deleteChart(id);
    }
  }
});