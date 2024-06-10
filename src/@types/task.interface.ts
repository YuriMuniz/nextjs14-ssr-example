declare interface ITask{
    id: number | string,
    title: string,
    description: string
}

declare interface IGetTaskParams{
    page?: number
    query?: string
}

declare interface ISaveTask {
    title: string
    description: string
}



