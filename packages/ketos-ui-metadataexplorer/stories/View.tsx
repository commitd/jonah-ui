import * as React from 'react'

import { storiesOf } from '@storybook/react'

import View from '../src/View'

const counts = [
    {
        key: 'format',
        count: 23
    },
    {
        key: 'version',
        count: 2
    }
]

const data = {
    corpus: {
        id: 'test',
        metadata: {
            keys: {
                bins: counts
            }
        }
    }
}

storiesOf('View', module)
    .add('Simple', () => <View data={data} />)
