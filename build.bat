rmdir /s /q build\ui
mkdir build\ui

echo "Building UI in Javascript"

call yarn build

xcopy /s /e /i packages\ketos-feedback-form\build build\ui\ketos-feedback-form
xcopy /s /e /i packages\ketos-feedback-reader\build build\ui\ketos-feedback-reader
xcopy /s /e /i packages\ketos-ui-corpuslist\build build\ui\ketos-ui-corpuslist
xcopy /s /e /i packages\ketos-ui-corpussummary\build build\ui\ketos-ui-corpussummary
xcopy /s /e /i packages\ketos-ui-documentreader\build build\ui\ketos-ui-documentreader
xcopy /s /e /i packages\ketos-ui-documentsearch\build build\ui\ketos-ui-documentsearch
xcopy /s /e /i packages\ketos-ui-subjectoverview\build build\ui\ketos-ui-subjectoverview
xcopy /s /e /i packages\ketos-ui-mentionsearch\build build\ui\ketos-ui-mentionsearch
xcopy /s /e /i packages\ketos-ui-entitysearch\build build\ui\ketos-ui-entitysearch
xcopy /s /e /i packages\ketos-ui-entitydetails\build build\ui\ketos-ui-entitydetails
xcopy /s /e /i packages\ketos-ui-mentiondetails\build build\ui\ketos-ui-mentiondetails
xcopy /s /e /i packages\ketos-ui-map\build build\ui\ketos-ui-map
xcopy /s /e /i packages\ketos-ui-metadataexplorer\build build\ui\ketos-ui-metadataexplorer
xcopy /s /e /i packages\ketos-ui-relationsearch\build build\ui\ketos-ui-relationsearch
xcopy /s /e /i packages\ketos-ui-relationdetails\build build\ui\ketos-ui-relationdetails
xcopy /s /e /i packages\ketos-ui-network\build build\ui\ketos-ui-network
xcopy /s /e /i packages\ketos-ui-documentdetails\build build\ui\ketos-ui-documentdetails
xcopy /s /e /i packages\ketos-ui-editor\build build\ui\ketos-ui-editor
xcopy /s /e /i packages\ketos-ui-usermanagement\build build\ui\ketos-ui-usermanagement
xcopy /s /e /i packages\ketos-ui-cluster\build build\ui\ketos-ui-cluster

REM TODO Delete all the source maps as they are huge
REM find .\build\ui' -name "*.map" -type f -delete
