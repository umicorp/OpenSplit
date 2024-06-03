#!/bin/bash

# Set env vars at runtime
source ./scripts/set_env.sh
cp env-config.js ./build/env-config.js

# Start the backend
npm run prod_server  &

## Start the frontend
npm run run_build &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?