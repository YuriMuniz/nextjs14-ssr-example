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
import { removeTask } from "@/app/actions";

type CardTaskProps = {
  task: ITask;
};

export default function CardTask({ task }: CardTaskProps) {
  const [loadingRemove, setLoadingRemove] = useState(false);

  const { refresh, push } = useRouter();
  const handleRemove = async (id: string) => {
    setLoadingRemove(true);
    await removeTask(id);
    setLoadingRemove(false);
    
  };

  return (
    <Card className="w-full lg:w-auto lg:max-w-[400px] sm:h-[200px] h-[230px]">
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
      <CardFooter className="flex flex-wrap gap-3 justify-center">
        <Button color="secondary" onPress={() => push(`/edit/${task.id}`)}>
          Editar
        </Button>
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
