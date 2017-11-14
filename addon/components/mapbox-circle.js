/* global L */
import Ember from 'ember';
import layout from '../templates/components/mapbox-circle';

const { Component, isEmpty, isPresent, observer } = Ember;

export default Component.extend({
  layout,

  map: null,
  circle: null,
  center: null,
  radius: 200,
  options: {},

  isLoaded: observer('map', function() {
    let { map, circle, cluster } = this.getProperties('map', 'circle', 'cluster');

    if (isEmpty(map) || isEmpty(circle)) {
      return false;
    }

    if (isPresent(cluster)) {
      cluster.addLayer(circle);
    } else {
      circle.addTo(map);
    }

    return true;
  }),

  didInsertElement() {
    let { center, radius, options } = this.getProperties('center', 'radius', 'options');
    let circle = new L.circle(center, radius, options);

    this.set('circle', circle);
  },

  willDestroyElement() {
    let { map, circle } = this.getProperties('map', 'circle');

    if (map && circle) {
      map.removeLayer(circle);
    }
  }
});
