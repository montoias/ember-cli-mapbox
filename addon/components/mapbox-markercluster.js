/* global L */
import Ember from 'ember';
import layout from '../templates/components/mapbox-markercluster';

export default Ember.Component.extend({
  classNameBindings: ['isLoaded'],
  layout: layout,
  cluster: null,

  // Options
  animate: true,
  showCoverageOnHover: true,
  zoomToBoundsOnClick: true,
  spiderfyOnMaxZoom: true,
  removeOutsideVisibleBounds: true,
  spiderLegPolylineOptions: { weight: 1.5, color: '#222', opacity: 0.5 },
  spiderfyDistanceMultiplier: 1,
  maxClusterRadius: 80,

  isLoaded: Ember.computed('map', 'cluster', function() {
    let map = this.get('map');
    let cluster = this.get('cluster');
    if (!Ember.isEmpty(map) && !Ember.isEmpty(cluster)) {
      map.addLayer(cluster);
      return true;
    } else {
      return false;
    }
  }),

  setup: Ember.on('init', function() {
    let cluster = new L.MarkerClusterGroup({
      animate:                    this.get('animate'),
      showCoverageOnHover:        this.get('showCoverageOnHover'),
      zoomToBoundsOnClick:        this.get('zoomToBoundsOnClick'),
      spiderfyOnMaxZoom:          this.get('spiderfyOnMaxZoom'),
      removeOutsideVisibleBounds: this.get('removeOutsideVisibleBounds'),
      spiderLegPolylineOptions:   this.get('spiderLegPolylineOptions'),
      animateAddingMarkers:       this.get('animateAddingMarkers'),
      disableClusteringAtZoom:    this.get('disableClusteringAtZoom'),
      maxClusterRadius:           this.get('maxClusterRadius'),
      polygonOptions:             this.get('polygonOptions'),
      singleMarkerMode:           this.get('singleMarkerMode'),
      spiderfyDistanceMultiplier: this.get('spiderfyDistanceMultiplier'),
      iconCreateFunction:         this.get('iconCreateFunction')
    });
    this.set('cluster', cluster);
  }),

  teardown: Ember.on('willDestroyElement', function() {
    let cluster = this.get('cluster');
    let map = this.get('map');
    if (map && cluster) {
      map.removeLayer(cluster);
    }
  })
});
