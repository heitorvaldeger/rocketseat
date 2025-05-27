import { signIn } from "@/api/sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useSearchParams } from "react-router";
import { toast } from "sonner";
import * as z from "zod";

const signInFormSchema = z.object({
  email: z.string().email(),
});

type SignInForm = z.infer<typeof signInFormSchema>;

export const SignIn = () => {
  const [searchParams] = useSearchParams();

  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
    resolver: zodResolver(signInFormSchema),
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  const handleSignIn = async (data: SignInForm) => {
    try {
      await authenticate({ email: data.email });

      toast.success("Enviamos um link de autenticação para seu email!", {
        action: {
          label: "Reenviar",
          onClick: () => handleSignIn(data),
        },
      });
    } catch (error) {
      toast.error("Credenciais inválidas");
    }
  };

  return (
    <div className="p-8">
      <Button asChild className="absolute top-8 right-8" variant="ghost">
        <Link to="/sign-up">Novo estabelecimento</Link>
      </Button>
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar Painel
          </h1>
          <p className="text-muted-foreground text-sm">
            Acompanhe suas vendas pelo painel do parceiro
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>

            <Button className="w-full" disabled={isSubmitting} type="submit">
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
