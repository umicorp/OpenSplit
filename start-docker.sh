#!/bin/bash

# Start the backend
npm run prod_server  &

## Start the frontend
npm run run_build &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?