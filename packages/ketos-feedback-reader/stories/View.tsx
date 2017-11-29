import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import View from '../src/View'

const feedback = [
    {
        id: 'test1',
        subject: 'Test subject',
        comment: 'Description of data 1',
        pluginName: 'Our plugin',
        type: 'bug',
        user: 'me'
    },
    {
        id: 'test2',
        subject: 'Test subject 2',
        comment: 'Description of the issue we want and it goes into a lot of detail and makes up many many lines.',
        pluginName: undefined,
        type: 'enhancment',
        user: 'me'
    }
]
storiesOf('View', module)
    .add('No datasets', () => <View feedback={[]} onDelete={action('deleted')} />)
    .add('All datasets', () => (
        <View
            feedback={feedback}
            onDelete={action('deleted')}
        />))
