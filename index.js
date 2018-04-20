var timezones = require('./timezones')

module.exports = function (date, options) {
  if (!options && (typeof date === 'object') && !(date instanceof Date)) {
    options = date
    date = null
  }

  if (date == null) date = Date.now()
  if (date instanceof Date) date = date.getTime()
  if (!options) options = {}

  date = date / 1000

  var result = timezones.map(function (zone) {
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
  })

  if (options.sort !== false) {
    result.sort(function (a, b) {
      return a.offset - b.offset
    })
  }

  return result
}
