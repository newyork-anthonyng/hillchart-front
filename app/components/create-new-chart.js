import Component from '@ember/component';

export default Component.extend({
  onCreateNewChart() {},

  init() {
    this._super(...arguments);

    this.title = '';
  },

  createNewChart() {
    const trimmedTitle = this.title.trim();

    if (trimmedTitle !== '') {
      this.onCreateNewChart(trimmedTitle);
      this.resetTitle();
    }
  },

  resetTitle() {
    this.set('title', '');
  },

  actions: {
    createChart() {
      this.createNewChart();
    }
  }
});
