"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";
import TaskService from "@/services/api/tasks/client";

type CardTaskProps = {
  task: ITask;
};

export default function CardTask({ task }: CardTaskProps) {
  const [loadingRemove, setLoadingRemove] = useState(false);
 
  const { refresh, push } = useRouter();
  const handleRemove = async (id: number | string) => {
    setLoadingRemove(true);
    try {
      const { remove } = await TaskService();
      await remove(id);
      refresh()
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingRemove(false);
    }
  };

  return (
    <Card className="max-w-[400px] sm:h-[200px] min-h-[200px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">{task.title}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{task.description}</p>
      </CardBody>
      <Divider />
      <CardFooter className="flex flex-wrap gap-3">
        <Button color="secondary" onPress={() => push(`/edit/${task.id}`)}>Editar</Button>
        <Button
          color="danger"
          isLoading={loadingRemove}
          onPress={() => handleRemove(task.id)}
        >
          Remover
        </Button>
      </CardFooter>
    </Card>
  );
}