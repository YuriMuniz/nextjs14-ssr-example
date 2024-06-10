import CardTask from "@/components/Card/Card";
import { PaginationComponent } from "@/components/Pagination/Pagination";
import { Search } from "@/components/Search/Search";
import TaskServiceServer from "@/services/api/tasks/server";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const { getTasks, getTotalTasks } = await TaskServiceServer();
  const totalTasks = await getTotalTasks();
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query ?? undefined;
  const tasks = await getTasks({ page: currentPage, query });

  return (
    <main className="w-full lg:p-24 p-6 flex justify-center min-h-screen">
      <div className="w-full max-w-[720px] flex flex-col items-center justify-between">
        <div className="w-full flex lg:flex-row flex-col gap-3">
          <Search />
          <Button color="primary">
            <Link href="/register" className="w-full">
              Cadastrar
            </Link>
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 w-full h-full my-6 lg:justify-start justify-center">
          {tasks?.map((item) => (
            <CardTask key={item.id} task={item} />
          ))}
          {query && tasks.length === 0 && (
            <div className="w-full flex items-center justify-center">
              <p className="self-center">Não existe atividade com esse nome.</p>
            </div>
          )}
        </div>

        {tasks.length > 0 && <PaginationComponent pageCount={totalTasks} />}
      </div>
    </main>
  );
}
