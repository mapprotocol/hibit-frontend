#!/bin/bash
git pull
yarn run build
pm2 delete "yarn run start"
pm2 start "yarn run start"