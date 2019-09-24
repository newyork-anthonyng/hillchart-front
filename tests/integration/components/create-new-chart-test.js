import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | create-new-chart', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<CreateNewChart />`);

    const textContent = this.element.textContent.trim();
    assert.ok(textContent.includes('New Chart Title'));
    assert.ok(textContent.includes('Create new chart'));
  });

  test('external action is triggered when button is clicked', async function(assert) {
    assert.expect(1);

    this.set('externalAction', actual => {
      const expected = 'Add https';
      assert.equal(actual, expected)
    });

    await render(hbs`<CreateNewChart @onCreateNewChart={{action externalAction}} />`);

    await fillIn('input', 'Add https');
    await click('button');
  });

  test('input field is cleared after clicking button', async function(assert) {
    await render(hbs`<CreateNewChart />`);
    await fillIn('input', 'Add https');

    assert.equal(this.element.querySelector('input').value, 'Add https');

    await click('button');
    assert.equal(this.element.querySelector('input').value, '');
  });

  test('external action is not triggered when button is clicked and input is blank', async function(assert) {
    assert.expect(0);

    this.set('externalAction', actual => {
      const expected = '   ';
      assert.equal(actual, expected)
    });

    await render(hbs`<CreateNewChart @onCreateNewChart={{action externalAction}} />`);

    await fillIn('input', '   ');
    await click('button');
  });
});
