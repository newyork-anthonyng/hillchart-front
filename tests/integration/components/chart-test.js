import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | chart', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<Chart @id="1" @title="Add https" @progress="42" />`);

    const textContent = this.element.textContent;
    assert.ok(textContent.includes('Add https'));
    assert.ok(textContent.includes('42%'));
  });

  test('external action is triggered when delete button is clicked', async function(assert) {
    assert.expect(1);

    this.set('externalAction', actual => {
      const expected = '1';
      assert.equal(actual, expected)
    });

    await render(hbs`<Chart @id="1" @title="Add https" @progress="42" @onDeleteChart={{action externalAction}} />`);

    await click('button');
  });
});
