#!/bin/bash

export `cat ../mongo_creds.properties`
npm run-script find_one_and_update