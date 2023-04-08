export default interface Post {
    id: string
    title: string
    contents: string
    author: string
    creationDate: Date
    updateDates: Array<Date>
}
