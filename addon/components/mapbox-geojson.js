import { on } from '@ember/object/evented';
import { isEmpty } from '@ember/utils';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/mapbox-geojson';

export default Component.extend({
  classNameBindings: ['isLoaded'],
  layout: layout,
  geojson: null,

  isLoaded: computed('map', 'geojson', function() {
    let map = this.get('map');
    let geojson = this.get('geojson');
    if (!isEmpty(map) && !isEmpty(geojson)) {
      geojson.addTo(map);
      return true;
    }
    return false;
  }),

  setup: on('init', function() {
    let popupTitle = this.get('popup-title');
    let geojson = L.geoJson(this.get('json'), {
      onEachFeature(feature, layer) {
        if (popupTitle) {
          layer.bindPopup(popupTitle);
        }
      }
    });

    geojson.on('click', () => {
      this.sendAction('onclick');
    });

    this.set('geojson', geojson);
  }),

  teardown: on('willDestroyElement', function() {
    let geojson = this.get('geojson');
    let map = this.get('map');
    if (map && geojson) {
      map.removeLayer(geojson);
    }
  }),

  popup: on('didRender', function() {
    if (this.get('is-open')) {
      this.get('geojson').openPopup();
    }
  })
});
