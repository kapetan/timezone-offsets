var test = require('tape')

var tz = require('../')

test('has zones', function (t) {
  var zones = tz()
  var previous = null

  t.ok(zones.length > 0, zones.length + ' zones')

  zones.forEach(function (zone) {
    t.ok(typeof zone.name === 'string', 'has string name')
    t.ok(typeof zone.countryCode === 'string', 'has string country code')
    t.ok(typeof zone.offset === 'number', 'has number offset')
    t.ok(typeof zone.abbreviation === 'string', 'has string abbreviation')
    t.ok(typeof zone.daylightSavingsTime === 'boolean', 'has boolean daylight savings time')

    if (previous) {
      t.ok(previous.offset <= zone.offset, 'has increasing offset')
      t.ok(previous.offset !== zone.offset || previous.name <= zone.name, 'has increasing name when equal offset')
    }

    previous = zone
  })

  t.end()
})

test('find', function (t) {
  var zone = tz.find('Europe/Copenhagen')

  t.equals(zone.name, 'Europe/Copenhagen')
  t.equals(zone.countryCode, 'DK')
  t.ok(typeof zone.offset === 'number', 'has number offset')
  t.ok(typeof zone.abbreviation === 'string', 'has string abbreviation')
  t.ok(typeof zone.daylightSavingsTime === 'boolean', 'has boolean daylight savings time')

  t.end()
})
