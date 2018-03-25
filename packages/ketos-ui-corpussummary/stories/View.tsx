import * as React from 'react'

import { storiesOf } from '@storybook/react'

import View from '../src/View'

const documentTypes = [
    {
        term: 'word',
        count: 233
    },
    {
        term: 'excel',
        count: 78
    },
    {
        term: 'powerpoint',
        count: 33
    },
]

const mentionTypes = [
    {
        term: 'people',
        count: 233
    },
    {
        term: 'location',
        count: 78
    },
    {
        term: 'organisation',
        count: 33
    },
    {
        term: 'temporal',
        count: 100
    }
]

const languages = [
    {
        term: 'de',
        count: 2
    },
    {
        term: 'en',
        count: 233
    },
]

const classifications = [
    {
        term: 'O',
        count: 2
    },
    {
        term: 'NPM',
        count: 23
    },
]

const documentTimeline = [
    { ts: new Date(1982, 1, 1).toUTCString(), count: 125 },
    { ts: new Date(1987, 1, 1).toUTCString(), count: 257 },
    { ts: new Date(1993, 1, 1).toUTCString(), count: 345 },
    { ts: new Date(1997, 1, 1).toUTCString(), count: 515 },
    { ts: new Date(2001, 1, 1).toUTCString(), count: 132 },
    { ts: new Date(2005, 1, 1).toUTCString(), count: 305 },
    { ts: new Date(2011, 1, 1).toUTCString(), count: 270 },
    { ts: new Date(2015, 1, 1).toUTCString(), count: 470 }
]

const data = {
    corpus: {
        id: 'test-id',
        name: 'Test Corpus',
        numDocuments: 100000,
        numEntities: 2021340,
        numEvents: 42,
        numRelations: 12331,
        documentTypes: {
            bins: documentTypes
        },
        documentLanguages: {
            bins: languages
        },
        mentionTypes: {
            bins: mentionTypes
        },
        documentClassifications: {
            bins: classifications
        },
        documentTimeline: {
            bins: documentTimeline
        }
    }
}

storiesOf('View', module)
    .add('No props', () => <View />)
    .add('All props', () => (
        <View
            data={data}
        />))
