#!/bin/bash

echo "GOOGLE_CLIENT_ID=$1" >> apps/sample-app/.env
echo "MICROSOFT_CLIENT_ID=$2" >> apps/sample-app/.env
echo "MICROSOFT_SIGNATURE_HASH=$3" >> apps/sample-app/.env
echo "DROPBOX_CLIENT_ID=$4" >> apps/sample-app/.env