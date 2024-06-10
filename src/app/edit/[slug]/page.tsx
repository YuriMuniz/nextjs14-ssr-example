'use client';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@nextui-org/react";
import InputComponent from "@/components/Input/Input";
import { useCallback, useEffect, useState } from "react";
import TaskService from "@/services/api/tasks/client";
import { useRouter, redirect } from "next/navigation";



const schemaEditTask = yup
  .object({
    title: yup.string().required("Campo Título é obrigatório."),
    description: yup.string().required("Campo Descrição é obrigatório."),
  })
  .required();

export default function Edit({ params }: { params: { slug: string } }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ISaveTask>({
    resolver: yupResolver(schemaEditTask),
    mode: "onSubmit",
    shouldFocusError: false,
  });

  const findTask = useCallback(async () => {
    try {
      const { findById } = await TaskService();
      const { description, title } = await findById(params.slug);
      reset({
        title,
        description,
      });
      setValue("title", title);
      setValue("description", description);
     
    } catch (error) {
      //console.log(error);
    }
  }, [params, setValue, reset])

  useEffect(() => {
    if(params.slug) findTask()    
  }, [params, findTask]);



  const handleEdit = async (data: ISaveTask) => {
    setLoading(true);
    const newTask: ISaveTask = {
      title: data.title,
      description: data.description,
    };
    try {
      const {  update } = await TaskService();
      await update(params.slug, newTask);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full max-w-[440px] flex flex-col items-center gap-3">
      <div className="flex flex-wrap justify-start items-center w-full gap-7">
        <Button color="secondary" onPress={() => router.push("/")}>
          Voltar
        </Button>
        <h1 className="text-[32px]">Editar Atividade</h1>
      </div>

      <form
        onSubmit={handleSubmit(handleEdit)}
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
          data-testid="edit-button"
          color="primary"
          type="submit"
          className="mt-4"
          isLoading={loading}
        >
          Salvar
        </Button>
      </form>
    </main>
  );
}
