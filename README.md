# ember-cli-mapbox

[![npm version](https://badge.fury.io/js/ember-cli-mapbox.svg)](https://badge.fury.io/js/ember-cli-mapbox)
[![Build Status](https://circleci.com/gh/binhums/ember-cli-mapbox/tree/master.svg?style=svg)](https://circleci.com/gh/binhums/ember-cli-mapbox/tree/master)

Ember addon to include template driven Mapbox.js components in your Ember project.

## Installation

#### Step 1: Install ember-cli-mapbox
```bash
ember install ember-cli-mapbox
```

#### Step 2: Add your access token to `config/environment.js`:
```js
mapbox: {
  accessToken: 'yourAccessToken',
},
```

## Components

### mapbox-map

The addon includes a component for constructing a mapbox map:

```hbs
{{mapbox-map mapId='ember-cli-mapbox.7c3914f2' divId='mega-map'}}
```

Which will generate a `<div id="mega-map">`, and initialise the map with the
corresponding mapId form mapbox.

If `divId` is not specified it defaults to 'map'.

You can specify the zoom level, center of the map, and trigger an `onclick` event as attributes.
The `onclick` event will return an instance of the event containing the lat, lng, among other properties.

```hbs
{{mapbox-map
  mapId=model.sfMapId
  center=(mapbox-coords 37.768 -122.381)
  onclick="actionName"
  zoom=13}}
```

### mapbox-marker

When used as a block `mapbox-map` will yield an instance of the map. You can use
this to add markers to the map through the `mapbox-marker` component in your
templates:

```hbs
{{#mapbox-map mapId='ember-cli-mapbox.7c3914f2' as |map|}}
  {{#each positions as |position|}}
    {{mapbox-marker map=map coordinates=position.coordinates}}
  {{/each}}
{{/mapbox-map}}
```

You can also specify the `size`, `color` and `symbol` of the marker with those
attributes, set the marker to be `draggable` and trigger an `onclick`, an `onpopupopen` and an
`onpopupclose` event.

Popup titles can be set with `popup-title` and can be opened by setting the
`is-open` property to true.

To make the marker recenter the map when it is added, you can sepecify `recenter`
as a property oft he marker:

```hbs
{{mapbox-marker map=map coordinates=position.coordinates recenter=true}}
```

### mapbox-markercluster

You can cluster markers into a markercluster group by yielding a mapbox-markercluster and nesting mapbox-markers inside:

```hbs
{{#mapbox-map mapId='ember-cli-mapbox.7c3914f2' as |map|}}
  {{#mapbox-markercluster map=map as |cluster|}}
    {{#each positions as |position|}}
      {{mapbox-marker map=map cluster=cluster coordinates=position.coordinates}}
    {{/each}}
  {{/mapbox-markercluster}}
{{/mapbox-map}}
```

Nested mapbox-markers carry all of the same properties/attributes as regular markers.

### mapbox-geojson

Similar to `mapbox-marker`, you can use `mapbox-geojson` to add arbitrary polygons and points to your map:

```hbs
{{#mapbox-map mapId='ember-cli-mapbox.7c3914f2' as |map|}}
  {{#each areas as |area|}}
    {{mapbox-geojson map=map json=area.geometry}}
  {{/each}}
{{/mapbox-map}}
```

You can specify and trigger an `onclick` event.

Popup titles can be set with `popup-title` and can be manually opened by setting the `is-open` property to true.

## Helpers

### mapbox-coords

A helper for setting up a coordinate pair from a latitude and a longitude e.g.

```hbs
{{mapbox-map
  mapId=model.sfMapId
  center=(mapbox-coords 37.768 -122.381)
  zoom=13
  as |map|}}
```

or

```hbs
{{mapbox-marker map=map coordinates=(mapbox-coords 23.333, 45.422)}}
```

# Collaborating

If you want to collaborate on this Ember addon:

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

The dummy app has some basic mapbox usage.

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://www.ember-cli.com/).
