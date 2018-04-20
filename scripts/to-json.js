#!/usr/bin/env node

var fs = require('fs')
var path = require('path')
var parse = require('csv-parse/lib/sync')

var argv = process.argv
var dir = argv[2]

var timezones = fs.readFileSync(path.join(dir, 'timezone.csv'), 'utf8')
var zones = fs.readFileSync(path.join(dir, 'zone.csv'), 'utf8')

var timezonesJson = parse(timezones, {
  columns: ['zone_id', 'abbreviation', 'time_start', 'gmt_offset', 'dst'],
  auto_parse: function (value, context) {
    if (context.column === 'time_start') return parseInt(value, 10)
    if (context.column === 'gmt_offset') return parseInt(value, 10)
    if (context.column === 'dst') return value === '1'
    return value
  }
})

var zonesJson = parse(zones, {
  columns: ['zone_id', 'country_code', 'zone_name']
})

var result = []

timezonesJson.forEach(function (timezone) {
  var latest = result[result.length - 1]

  if (!latest || latest.id !== timezone.zone_id) {
    var zone = zonesJson.find(function (z) {
      return z.zone_id === timezone.zone_id
    })

    latest = {
      id: zone.zone_id,
      name: zone.zone_name,
      countryCode: zone.country_code,
      timestamps: [],
      offsets: [],
      abbreviations: [],
      daylightSavingsTime: []
    }

    result.push(latest)
  }

  latest.timestamps.push(timezone.time_start)
  latest.offsets.push(timezone.gmt_offset)
  latest.abbreviations.push(timezone.abbreviation)
  latest.daylightSavingsTime.push(timezone.dst)
})

process.stdout.write(JSON.stringify(result, null, 2))
