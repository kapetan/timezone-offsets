var timezones = require('./timezones')

var getTime = function (date) {
  if (date == null) date = Date.now()
  if (date instanceof Date) date = date.getTime()
  date = date / 1000
  return date
}

var getZone = function (date, zone) {
  for (var i = zone.timestamps.length - 1; i >= 0; i--) {
    var ts = zone.timestamps[i]

    if (ts <= date || i === 0) {
      return {
        name: zone.name,
        countryCode: zone.countryCode,
        offset: zone.offsets[i] * 1000,
        abbreviation: zone.abbreviations[i],
        daylightSavingsTime: zone.daylightSavingsTime[i]
      }
    }
  }
}

module.exports = exports = function (date, options) {
  if (!options && (typeof date === 'object') && !(date instanceof Date)) {
    options = date
    date = null
  }

  if (!options) options = {}
  date = getTime(date)

  var result = timezones.map(getZone.bind(null, date))

  if (options.sort !== false) {
    result.sort(function (a, b) {
      var d = a.offset - b.offset
      if (d) return d
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
  }

  return result
}

exports.find = function (date, name) {
  if (!name) {
    name = date
    date = null
  }

  date = getTime(date)

  for (var i = 0; i < timezones.length; i++) {
    var zone = timezones[i]
    if (zone.name === name) return getZone(date, zone)
  }
}
