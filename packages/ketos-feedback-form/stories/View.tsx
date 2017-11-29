import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import View from '../src/View'

const data = {
    type: 'bug',
    subject: 'This is an entry',
    comment: 'This is the comment'
}

const plugins = [
    { id: 'one', name: 'One' }
]

storiesOf('View', module)
    .add('Fixed data', () => (
        <View
            data={data}
            plugins={plugins}
            onSubmit={action('submit')}
            onChange={action('change')}
        />
    ))
