#!/bin/bash

export `cat ../mongo_creds.properties`
npm run-script update_multiple_upsert