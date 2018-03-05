import * as React from 'react'
import { Grid } from 'semantic-ui-react'
import { TimelineChart, Card, timeBinsToXY } from 'invest-components'
import { DocumentSearch } from 'ketos-components'
import { Response } from '../DataContainer'
import FilteredDataContainer from './FilteredDataContainer'
import FilteredResults from './FilteredResults'

export type Props = {
    datasetId: string,
    query: DocumentSearch
    data?: Response
}

export type State = {
    from?: Date
    to?: Date
}

export default class Results extends React.Component<Props> {

    state: State = {}

    render() {
        const { data, datasetId, query } = this.props
        const { from, to } = this.state
        if (!data || !data.corpus) {
            return <div />
        }

        const { documentTimeline } = data.corpus

        let documentFilter = Object.assign({}, query.documentFilter)
        if (from || to) {
            documentFilter.info = Object.assign({}, documentFilter.info)
            if (from) {
                documentFilter.info.startTimestamp = from.getTime() - 1000
            }
            if (to) {
                documentFilter.info.endTimestamp = to.getTime() + 1000
            }

        }

        return (
            <Grid>
                <Grid.Row columns={1}>
                    {documentTimeline && documentTimeline.bins.length > 1 && <Grid.Column>
                        <Card title="Document timeline">
                            <TimelineChart
                                data={timeBinsToXY(documentTimeline.bins)}
                                onSelectionChanged={this.handleDocumentTimeRangeChanged}
                            />
                        </Card>
                    </Grid.Column>}
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        {
                            <FilteredDataContainer
                                variables={{
                                    datasetId,
                                    documentFilter: documentFilter,
                                }}
                            >
                                <FilteredResults />
                            </FilteredDataContainer>}
                    </Grid.Column>
                </Grid.Row>
            </Grid >
        )
    }

    private handleDocumentTimeRangeChanged = (from: Date, to: Date) => {

        // We aggregate over say a month, but then we are rounding down to begging of the month
        // say we have 1st Jan to 1st Dec
        // thus for the last max to value we'll get nothing back (since the data is from 
        // 1st Dec through to 31st Dec). So if you select past the top value we add a whole month on

        const maxTime = this.props.data
            && this.props.data.corpus.documentTimeline.bins
                .map(b => new Date(b.ts as number).getTime())
                .reduce((a, b) => Math.max(a, b), 0)
        if (maxTime && maxTime < to.getTime()) {

            const interval = this.props.data && this.props.data.corpus.documentTimeline.interval
            if (!interval) {
                return
            }

            to = addIntervalToDate(to, interval)
        }

        this.setState({
            from,
            to: to
        })
    }

}

// TODO: This could be moved into invest-utils (but I was wondered what part of the handleDocumentTimeRangeChanged)
// should go with them.

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY
const MONTH = 31 * DAY
const YEAR = 365 * DAY

export function intervalToMillis(interval: string): number {
    switch (interval.toUpperCase()) {
        case 'YEAR': return YEAR
        case 'MONTH': return MONTH
        case 'WEEK': return WEEK
        case 'DAY': return DAY
        case 'HOUR': return HOUR
        case 'MINUTE': return MINUTE
        case 'SECOND': return SECOND
        default:
            return 0
    }
}

export function addIntervalToDate(date: Date, interval: string): Date {
    return new Date(date.getTime() + intervalToMillis(interval))
} 