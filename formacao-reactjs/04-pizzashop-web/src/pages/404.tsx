import { Link } from "react-router";

export const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Página não encontrada</h1>

      <p className="text-accent-foreground">
        Voltar para o{" "}
        <Link className="text-sky-600 dark:text-sky-400" to="/">
          Dashboard
        </Link>
      </p>
    </div>
  );
};
