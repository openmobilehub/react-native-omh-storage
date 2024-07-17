#!/bin/bash

yarn lerna version --no-push --no-git-tag-version --no-changelog

PACKAGE_VERSION=$(grep '"version"' lerna.json | awk -F '"' '{print $4}')

git checkout -b "v$PACKAGE_VERSION"

git add -A
git commit -s -S -m "chore: release v$PACKAGE_VERSION"

git push origin "v$PACKAGE_VERSION"

echo "Release branch created"
REPO_URL="https://github.com/openmobilehub/react-native-omh-storage"
echo "Please create a pull request to merge the release branch into main"
echo "$REPO_URL/pull/new/v${PACKAGE_VERSION}"