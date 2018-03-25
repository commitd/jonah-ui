import * as React from 'react'

import { storiesOf } from '@storybook/react'

import View from '../src/View'

const corpora = [
    {
        id: 'test',
        name: 'Data 1',
        description: 'Description of data 1',
        documentCount: 11234,
        entityCount: 23,
        relationCount: 34

    }
]
storiesOf('View', module)
    .add('No datasets', () => <View data={{ corpora: [] }} />)
    .add('All datasets', () => (
        <View
            data={{ corpora }}
        />))
