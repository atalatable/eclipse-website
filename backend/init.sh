#!/bin/sh

node src/data/createDB.js

echo "starting server..."

node src/index.js