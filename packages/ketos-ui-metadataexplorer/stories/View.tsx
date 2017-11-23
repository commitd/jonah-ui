import * as React from 'react'

import { storiesOf } from '@storybook/react'

import View from '../src/View'

const counts = [
    {
        key: 'format',
        count: 23
    }
]
storiesOf('View', module)
    .add('Simple', () => <View datasetId="example" metadataCounts={counts} />)
