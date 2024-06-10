
import { post } from "../../methods/post";
import { del } from "../../methods/delete";
import { put } from "../../methods/put";
import { get } from "../../methods/get";

export default async function TaskService() {

  async function create(task: ITask): Promise<ITask> {
    const payload = JSON.stringify(task);
    return await post<ITask, string>("/tasks", payload, {
      headers: { "Content-Type": "application/json" },
    });
  }
  async function remove(id: number | string): Promise<void> {
    await del<void>(`tasks/${id}`);
  }


  async function findById(id: number | string): Promise<ITask> {
    return await get<ITask>(`/tasks/${id}`);
  }

  async function findByTitle(title: string): Promise<ITask[]> {
    return await get<ITask[]>(`/tasks?title_like=${title}`);
  }

  async function update(id: number | string, task: ISaveTask) {
    const payload = JSON.stringify(task);
    return await put<ITask, string>(`/tasks/${id}`, payload, {
      headers: { "Content-Type": "application/json" },
    });
  }

  return {
    findById,
    findByTitle,
    create,
    update,
    remove,
  }
}


