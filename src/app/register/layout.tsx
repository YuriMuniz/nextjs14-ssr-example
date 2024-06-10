import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastrar Atividade",
  description: "Registro NextJS Example",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutRegister({ children }: LayoutProps) {
  return (
    <div className="w-full lg:p-24 p-6 flex justify-center min-h-screen">
      {children}
    </div>
  );
}
