#!/bin/bash

set -e

DIRNAME="$(dirname "$BASH_SOURCE")"
URL="https://timezonedb.com/files/timezonedb.csv.zip"
DOWNLOAD_TARGET="$DIRNAME/timezonedb.csv.zip"
UNZIP_TARGET="$DIRNAME/timezonedb"

function onexit {
  rm -f "$DOWNLOAD_TARGET" || true
  rm -rf "$UNZIP_TARGET" || true
}

trap onexit EXIT

curl --fail -o "$DOWNLOAD_TARGET" "$URL"
unzip -o "$DOWNLOAD_TARGET" -d "$UNZIP_TARGET"
node "$DIRNAME/to-json.js" "$UNZIP_TARGET" > "$DIRNAME/../timezones.json"
