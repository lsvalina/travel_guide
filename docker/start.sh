#!/bin/sh

if [ -z "$DATA_URL" ]; then
  echo "Data URL not set"
  exit 1
fi

node /app/bin/www