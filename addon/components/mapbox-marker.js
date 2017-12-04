import { on } from '@ember/object/evented';
import { isEmpty } from '@ember/utils';
import { computed, observer } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/mapbox-marker';
import { MARKER_EVENTS } from '../constants/events';

export default Component.extend({
  classNameBindings: ['isLoaded'],
  layout: layout,
  symbol: '',
  color: '#444444',
  marker: null,
  draggable: false,

  isLoaded: computed('map', 'marker', function() {
    let map = this.get('map');
    let marker = this.get('marker');
    let cluster = this.get('cluster');

    if (!isEmpty(map) && !isEmpty(marker)) {
      if (!isEmpty(cluster)) {
        cluster.addLayer(marker);
      } else {
        marker.addTo(map);
      }
      return true;
    } else {
      return false;
    }
  }),

  iconChange: observer('color', 'size', 'symbol', function() {
    let map = this.get('map');
    let marker = this.get('marker');
    if (typeof map !== 'undefined' && marker != null) {
      marker.setIcon(L.mapbox.marker.icon({
        'marker-color': this.get('color'),
        'marker-size': this.get('size'),
        'marker-symbol': this.get('symbol')
      }));
    }
  }),

  setup: on('init', function() {
    let marker = L.marker(this.get('coordinates'), {
      icon: L.mapbox.marker.icon({
        'marker-color': this.get('color'),
        'marker-size': this.get('size'),
        'marker-symbol': this.get('symbol')
      }),
      draggable: this.get('draggable')
    });
    marker.bindPopup(this.get('popup-title'));

    MARKER_EVENTS.forEach((event) => {
      marker.on(event, (e) => this.sendAction('on' + event, marker, e));
    });

    this.set('marker', marker);
  }),

  teardown: on('willDestroyElement', function() {
    let marker = this.get('marker');
    let map = this.get('map');
    if (map && marker) {
      map.removeLayer(marker);
    }
  }),

  popup: on('didRender', function() {
    if (this.get('is-open')) {
      this.get('marker').openPopup();
      if (this.get('recenter')) {
        this.get('map').setView(this.get('coordinates'));
      }
    }
  })
});
