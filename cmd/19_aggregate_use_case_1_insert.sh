#!/bin/bash

export `cat ../mongo_creds.properties`
npm run-script aggregate_use_case_1_insert