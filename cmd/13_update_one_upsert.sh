#!/bin/bash

export `cat ../mongo_creds.properties`
npm run-script update_one_upsert