# timezone-offset

Timezone list with adjusted time offset.

    npm install timezone-offsets

## Usage

The constructor returns a list of timezones. The time offset is based on the provided date (can ba a `Date` instance or a number).

```javascript
var tz = require('timezone-offsets')

var timezones = tz(new Date('2016-01-01'))
console.log(timezones)
```

The objects in the returned array look like the following.

```javascript
{
  name: 'Pacific/Tongatapu',
  countryCode: 'TO',
  offset: 46800000,             // Offset from UTC in milliseconds
  abbreviation: '+13',
  daylightSavingsTime: false
}
```
