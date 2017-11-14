import { moduleForComponent, test } from 'ember-qunit';
// import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mapbox-circle', 'Integration | Component | mapbox circle', {
  integration: true,
  beforeEach() {
    this.set('map', {});
    this.set('center', {});
  }
});

test('it renders', function(assert) {
  assert.expect(0);
});
