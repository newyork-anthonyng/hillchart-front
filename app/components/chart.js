import Component from '@ember/component';

export default Component.extend({
  onDeleteChart() {},

  deleteChart() {
    this.onDeleteChart(this.id);
  },

  actions: {
    deleteChart() {
      this.deleteChart();
    }
  }
});
