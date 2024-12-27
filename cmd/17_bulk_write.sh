#!/bin/bash

export `cat ../mongo_creds.properties`
npm run-script bulk_write