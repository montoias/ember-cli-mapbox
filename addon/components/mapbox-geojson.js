/* global L */
import Ember from 'ember';
import layout from '../templates/components/mapbox-geojson';

const { Component, computed, isEmpty } = Ember;

export default Component.extend({
  classNameBindings: ['isLoaded'],
  layout: layout,
  geoJson: null,

  json: {},
  fitBounds: false,
  customStyle({ className, color }) {
    let options = {};

    if (className) {
      options = { ...options, className };
    }

    if (color) {
      options = {...options, color};
    }

    return options;
  },

  isLoaded: computed('map', 'json', function() {
    let { map, geoJson } = this.getProperties('map', 'geoJson');

    if (isEmpty(map)) {
      return false;
    }

    if (!isEmpty(geoJson)) {
      this._removeLayer(map, geoJson);
    }

    this.set('geoJson', this._createGeoJson());
    this._addLayer(map, this.get('geoJson'));

    return true;
  }),

  init() {
    this._super(...arguments);
  },

  willDestroyElement() {
    let { map, geoJson } = this.getProperties('map', 'geoJson');

    if (!isEmpty(map) && !isEmpty(geoJson)) {
      this._removeLayer(map, geoJson);
    }
  },

  didRender() {
    if (this.get('is-open')) {
      this.get('geoJson').openPopup();
    }
  },

  _removeLayer(map, geoJson) {
    map.removeLayer(geoJson);
  },

  _addLayer(map, geoJson) {
    geoJson.addTo(map);

    if (this.get('fitBounds')) {
      map.fitBounds(geoJson.getBounds());
    }
  },

  _createGeoJson() {
    let popupTitle = this.get('popup-title');
    let geoJson = L.geoJson(this.get('json'), {
      style: this.get('customStyle'),
      onEachFeature(feature, layer) {
        if (popupTitle) {
          layer.bindPopup(popupTitle);
        }
      }
    });

    geoJson.on('click', () => {
      this.sendAction('onclick');
    });

    return geoJson;
  }
});
