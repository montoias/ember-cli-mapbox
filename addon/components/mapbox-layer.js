import Ember from 'ember';
import layout from '../templates/components/mapbox-layer';

export default Ember.Component.extend({
  layout,

  id: null,
  map: null,
  layer: {},

  didInsertElement() {
    let id = this.get('layer')['id'];
    if (!id) {
      Ember.Logger.error("Provide an id");

      return;
    }

    this.set('id', id);
    this.get('map').addLayer(this.get('layer'));
  },

  willDestroyElement() {
    this.get('map').removeLayer(this.get('id'));
  }
});
