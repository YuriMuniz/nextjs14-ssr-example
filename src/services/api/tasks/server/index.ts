"use server";

import { get } from "../../methods/get";


export default async function TaskServiceServer() {
  const perPage = 6;

  async function getTasks(params: IGetTaskParams): Promise<ITask[]> {
    const queryString = params.query
      ? `?title_like=${encodeURIComponent(params.query)}&_page=${
          params.page || 1
        }&_limit=${perPage}`
      : `?_page=${params.page || 1}&_limit=${perPage}`;
    return await get<ITask[]>(`/tasks${queryString}`);
  }

  async function getTotalTasks(): Promise<number> {
    const response = await get<ITask[]>(`/tasks`);
    return Math.ceil(response.length / perPage);
  }

  return {
    getTotalTasks,
    getTasks,
  };
}
