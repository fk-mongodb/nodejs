#!/bin/bash

export `cat ../mongo_creds.properties`
npm run-script aggregate_use_case_2_insert