import Controller from '@ember/controller';

export default Controller.extend({
  createNewChart(title) {

    const newRecord = this.store.createRecord('chart', { title, progress: 0 });
    newRecord.save();
  },

  updateChart(id, percent) {
    this.store.findRecord('chart', id, { backgroundReload: false }).then(chart => {
      chart.set('progress', Math.floor(percent * 100));
      chart.save();
    });

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

    updateChart(id, percent) {
      this.updateChart(id, percent);
    },

    deleteChart(id) {
      this.deleteChart(id);
    }
  }
});