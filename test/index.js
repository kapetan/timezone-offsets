var test = require('tape')

var tz = require('../')

test('has zones', function (t) {
  var zones = tz()

  t.ok(zones.length > 0, zones.length + ' zones')

  zones.forEach(function (zone) {
    t.ok(typeof zone.name === 'string', 'has string name')
    t.ok(typeof zone.countryCode === 'string', 'has string country code')
    t.ok(typeof zone.offset === 'number', 'has number offset')
    t.ok(typeof zone.abbreviation === 'string', 'has string abbreviation')
    t.ok(typeof zone.daylightSavingsTime === 'boolean', 'has boolean daylight savings time')
  })

  t.end()
})
