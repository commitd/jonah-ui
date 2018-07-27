#!/bin/bash

##########################################


rmdir /s build\ui
mkdir build\ui

echo "Building UI in Javascript"

call yarn build

copy /s /e packages\ketos-feedback-form\build build\ui\ketos-feedback-form
copy /s /e packages\ketos-feedback-reader\build build\ui\ketos-feedback-reader
copy /s /e packages\ketos-ui-corpuslist\build build\ui\ketos-ui-corpuslist
copy /s /e packages\ketos-ui-corpussummary\build build\ui\ketos-ui-corpussummary
copy /s /e packages\ketos-ui-documentreader\build build\ui\ketos-ui-documentreader
copy /s /e packages\ketos-ui-documentsearch\build build\ui\ketos-ui-documentsearch
copy /s /e packages\ketos-ui-subjectoverview\build build\ui\ketos-ui-subjectoverview
copy /s /e packages\ketos-ui-mentionsearch\build build\ui\ketos-ui-mentionsearch
copy /s /e packages\ketos-ui-entitysearch\build build\ui\ketos-ui-entitysearch
copy /s /e packages\ketos-ui-entitydetails\build build\ui\ketos-ui-entitydetails
copy /s /e packages\ketos-ui-mentiondetails\build build\ui\ketos-ui-mentiondetails
copy /s /e packages\ketos-ui-map\build build\ui\ketos-ui-map
copy /s /e packages\ketos-ui-metadataexplorer\build build\ui\ketos-ui-metadataexplorer
copy /s /e packages\ketos-ui-relationsearch\build build\ui\ketos-ui-relationsearch
copy /s /e packages\ketos-ui-relationdetails\build build\ui\ketos-ui-relationdetails
copy /s /e packages\ketos-ui-network\build build\ui\ketos-ui-network
copy /s /e packages\ketos-ui-documentdetails\build build\ui\ketos-ui-documentdetails
copy /s /e packages\ketos-ui-editor\build build\ui\ketos-ui-editor
copy /s /e packages\ketos-ui-usermanagement\build build\ui\ketos-ui-usermanagement
copy /s /e packages\ketos-ui-cluster\build build\ui\ketos-ui-cluster

REM TODO Delete all the source maps as they are huge
REM find .\build\ui' -name "*.map" -type f -delete
