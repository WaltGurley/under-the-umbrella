#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build-ghpages

# navigate into the build output directory
cd dist-ghpages

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:WaltGurley/testing.git master:gh-pages

cd -