#!/usr/bin/env bash
watchify typings/*/*.d.ts interface/App.ts -p tsify -d -o dist/App.js -v
