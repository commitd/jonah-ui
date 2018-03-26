export interface DocumentResult {
    id: string
    length: number
    summary: string
    info: {
        title: string
        language: string
        source: string
        type: string
        classification: string
        timestamp: string
    }
}
