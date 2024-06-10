"use client";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@nextui-org/react";
import InputComponent from "@/components/Input/Input";
import { useState } from "react";
import TaskService from "@/services/api/tasks/client";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { createTask } from "../actions";

const schemaRegisterTask = yup
  .object({
    title: yup.string().required("Campo Título é obrigatório."),
    description: yup.string().required("Campo Descrição é obrigatório."),
  })
  .required();

export default function Register() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISaveTask>({
    resolver: yupResolver(schemaRegisterTask),
    mode: "onChange",
    shouldFocusError: false,
  });

  const handleRegister = async (data: ISaveTask) => {
    setLoading(true);
    const newTask: ITask = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
    };
    await createTask(newTask);
    setLoading(false);
  };

  return (
    <main className="w-full max-w-[440px] flex flex-col items-center gap-3">
      <div className="flex flex-wrap justify-start items-center w-full gap-7">
        <Button color="secondary" onPress={() => router.push("/")}>
          Voltar
        </Button>
        <h1 className="text-[32px]">Nova Atividade</h1>
      </div>

      <form
        onSubmit={handleSubmit(handleRegister)}
        method="post"
        className="flex flex-col gap-3 w-full"
      >
        <div className="flex flex-col gap-2">
          <InputComponent
            errors={errors}
            name="title"
            register={register}
            type="text"
            label="Título"
          />
        </div>
        <div className="flex flex-col gap-2">
          <InputComponent
            errors={errors}
            name="description"
            label="Descrição"
            register={register}
            type="text"
          />
        </div>
        <Button
          data-testid="register-button"
          color="primary"
          type="submit"
          className="mt-4"
          isLoading={loading}
        >
          Cadastrar
        </Button>
      </form>
    </main>
  );
}
