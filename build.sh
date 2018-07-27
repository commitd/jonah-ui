#!/bin/bash

##########################################


rm -rf build/ui
mkdir -p build/ui

echo "Building UI in Javascript"

yarn build

cp -r packages/ketos-feedback-form/build build/ui/ketos-feedback-form
cp -r packages/ketos-feedback-reader/build build/ui/ketos-feedback-reader
cp -r packages/ketos-ui-corpuslist/build build/ui/ketos-ui-corpuslist
cp -r packages/ketos-ui-corpussummary/build build/ui/ketos-ui-corpussummary
cp -r packages/ketos-ui-documentreader/build build/ui/ketos-ui-documentreader
cp -r packages/ketos-ui-documentsearch/build build/ui/ketos-ui-documentsearch
cp -r packages/ketos-ui-subjectoverview/build build/ui/ketos-ui-subjectoverview
cp -r packages/ketos-ui-mentionsearch/build build/ui/ketos-ui-mentionsearch
cp -r packages/ketos-ui-entitysearch/build build/ui/ketos-ui-entitysearch
cp -r packages/ketos-ui-entitydetails/build build/ui/ketos-ui-entitydetails
cp -r packages/ketos-ui-mentiondetails/build build/ui/ketos-ui-mentiondetails
cp -r packages/ketos-ui-map/build build/ui/ketos-ui-map
cp -r packages/ketos-ui-metadataexplorer/build build/ui/ketos-ui-metadataexplorer
cp -r packages/ketos-ui-relationsearch/build build/ui/ketos-ui-relationsearch
cp -r packages/ketos-ui-relationdetails/build build/ui/ketos-ui-relationdetails
cp -r packages/ketos-ui-network/build build/ui/ketos-ui-network
cp -r packages/ketos-ui-documentdetails/build build/ui/ketos-ui-documentdetails
cp -r packages/ketos-ui-editor/build build/ui/ketos-ui-editor
cp -r packages/ketos-ui-usermanagement/build build/ui/ketos-ui-usermanagement
cp -r packages/ketos-ui-cluster/build build/ui/ketos-ui-cluster

# Delete all the source maps as they are huge
find ./build/ui/ -name "*.map" -type f -delete
