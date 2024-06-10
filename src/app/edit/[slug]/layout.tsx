import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editar Atividade",
  description: "Editar NextJS Example",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutEdit({ children }: LayoutProps) {
  return (
    <div className="w-full lg:p-24 p-6 flex justify-center min-h-screen">
      {children}
    </div>
  );
}
