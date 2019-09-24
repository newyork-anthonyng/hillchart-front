import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Service from '@ember/service';

module('Unit | Controller | charts', function(hooks) {
  setupTest(hooks);

  test('should create new record on createNewChart action', function(assert) {
    assert.expect(3);

    const MockStore = Service.extend({
      createRecord(modelName, chartData) {
        assert.equal(modelName, 'chart')
        assert.deepEqual(chartData, { title: 'Add https', progress: 0 });

        return {
          save: () => {
            assert.ok(true);
          }
        };
      }
    });
    this.owner.register('service:mock-store', MockStore);
    this.owner.inject('controller:charts', 'store', 'service:mock-store');

    const controller = this.owner.lookup('controller:charts');
    controller.send('createNewChart', 'Add https');
  });

  test('should destroy record on deleteChart action', function(assert) {
    assert.expect(4);

    const MockStore = Service.extend({
      findRecord(modelName, id, options) {
        assert.equal(modelName, 'chart');
        assert.equal(id, 42);
        assert.deepEqual(options, { backgroundReload: false });

        return Promise.resolve({
          destroyRecord() {
            assert.ok(true);
          }
        });
      }
    });

    this.owner.register('service:mock-store', MockStore);
    this.owner.inject('controller:charts', 'store', 'service:mock-store');

    const controller = this.owner.lookup('controller:charts');
    controller.send('deleteChart', 42);
  });
});
