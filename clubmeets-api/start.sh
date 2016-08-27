#!/bin/bash
while ! nc -z db 27017; do sleep 2; done
node app.js
