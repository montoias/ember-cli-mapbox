/* global L */
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import mockMap from 'dummy/tests/helpers/mock-map';

moduleForComponent('mapbox-map', 'Integration | Component | mapbox map', {
  integration: true,

  beforeEach() {
    L.mapbox.map = () => mockMap;
  }
});

test('it sets up a mapbox map with the supplied ids', function(assert) {
  assert.expect(2);

  L.mapbox.map = function(divId, mapId) {
    assert.equal(divId, 'frap');
    assert.equal(mapId, 'brap');
    return mockMap;
  };

  this.render(hbs`{{mapbox-map divId='frap' mapId='brap'}}`);
});

test('it defaults the divId to map', function(assert) {
  assert.expect(2);

  L.mapbox.map = function(divId, mapId) {
    assert.equal(divId, 'map');
    assert.equal(mapId, 'brap');
    return mockMap;
  };

  this.render(hbs`{{mapbox-map mapId='brap'}}`);
});

test('it calls setView if a center is defined', function(assert) {
  assert.expect(1);

  mockMap.setView = function(center) {
    assert.equal(center, 'baba');
  };

  this.render(hbs`{{mapbox-map center='baba'}}`);
});

test('it calls setView with zoom if it is defined', function(assert) {
  assert.expect(2);

  mockMap.setView = function(center, zoom) {
    assert.equal(center, 'baba');
    assert.equal(zoom, 'gaga');
  };

  this.render(hbs`{{mapbox-map center='baba' zoom='gaga'}}`);
});

test('it registers an event for click (deprecated)', function(assert) {
  assert.expect(1);

  this.on('explode', function() {
    assert.ok(true);
  });

  mockMap.on = function(e, method) {
    if (e === 'click') {
      method();
    }
  };

  this.render(hbs`{{mapbox-map click='explode'}}`);
});

test('it registers an event for onclick', function(assert) {
  assert.expect(1);

  this.on('explode', function() {
    assert.ok(true);
  });

  mockMap.on = function(e, method) {
    if (e === 'click') {
      method();
    }
  };

  this.render(hbs`{{mapbox-map onclick='explode'}}`);
});

test('it registers an event for onlocationerror', function(assert) {
  assert.expect(1);

  this.on('explode', function() {
    assert.ok(true);
  });

  mockMap.on = function(e, method) {
    if (e === 'locationerror') {
      method();
    }
  };

  this.render(hbs`{{mapbox-map onlocationerror='explode'}}`);
});
