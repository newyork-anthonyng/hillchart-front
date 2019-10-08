import Controller from '@ember/controller';

export default Controller.extend({
  createNewChart(title) {

    const newRecord = this.store.createRecord('chart', { title, progress: 0 });
    newRecord.save();
  },

  updateChartTitle(id, newTitle) {
    this.store.findRecord('chart', id, { backgroundReload: false }).then(chart => {
      chart.set('title', newTitle);
      chart.save();
    });
  },

  updateChartPercent(id, percent) {
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

    updateChartPercent(id, percent) {
      this.updateChartPercent(id, percent);
    },

    deleteChart(id) {
      this.deleteChart(id);
    },

    updateChartTitle(id, title) {
      this.updateChartTitle(id, title);
    }
  }
});