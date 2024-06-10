"use server";

import TaskService from "@/services/api/tasks/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editTask(id: string, task: ISaveTask) {
  try {
    const { update } = await TaskService();
    await update(id, task);
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/");
  redirect("/");
}

export async function removeTask(id: string) {
  try {
    const { remove } = await TaskService();
    await remove(id);
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/");
  redirect("/");
}

export async function createTask(task: ITask) {
  try {
    const { create } = await TaskService();
    await create(task);
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/");
  redirect("/");
}
