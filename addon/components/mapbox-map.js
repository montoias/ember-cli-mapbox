import { deprecate } from '@ember/application/deprecations';
import { scheduleOnce } from '@ember/runloop';
import { on } from '@ember/object/evented';
import Component from '@ember/component';
import layout from '../templates/components/mapbox-map';
import { MAP_EVENTS } from '../constants/events';

export default Component.extend({
  layout: layout,
  divId: 'map',

  mapId: null,

  setup: on('didInsertElement', function() {
    scheduleOnce('afterRender', this, function() {
      let map = L.mapbox.map(this.get('divId'), this.get('mapId'));

      // Bind Events
      MAP_EVENTS.forEach((event) => {
        map.on(event, (e) => this.sendAction('on' + event, map, e));
      });

      // Setters
      if (this.get('center')) {
        map.setView(this.get('center'), this.get('zoom'));
      }

      if (this.get('click')) {
        deprecate('The "click" action in mapbox-map is deprecated, please use "onclick" instead.', false, {
          id: 'mapbox-map-click-action',
          url: 'https://github.com/binhums/ember-cli-mapbox',
          until: '1 April 2016'
        });

        map.on('click', (e) => this.sendAction('click', map, e));
      }

      // Set
      this.set('map', map);
    });
  })
});
