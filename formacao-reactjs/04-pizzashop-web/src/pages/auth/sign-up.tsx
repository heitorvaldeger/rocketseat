import { registerRestaurant } from "@/api/register-restaurant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import * as z from "zod";

const signUpFormSchema = z.object({
  email: z.string().email(),
  managerName: z.string(),
  phone: z.string(),
  restaurantName: z.string(),
});

type SignUpForm = z.infer<typeof signUpFormSchema>;

export const SignUp = () => {
  const navigate = useNavigate();
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
  });

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  });

  const handleSignUp = async (data: SignUpForm) => {
    try {
      await registerRestaurantFn(data);

      toast.success("Restaurante cadastrado com sucesso", {
        action: {
          label: "Fazer login",
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      });
    } catch (error) {
      toast.error("Erro ao cadastrar estabelecimento");
      console.log(error);
    }
  };

  return (
    <div className="p-8">
      <Button asChild className="absolute top-8 right-8" variant="ghost">
        <Link to="/sign-in">Fazer login</Link>
      </Button>
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>
          <p className="text-muted-foreground text-sm">
            Seja um parceiro e comece suas vendas
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register("restaurantName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register("managerName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input id="phone" type="tel" {...register("phone")} />
            </div>

            <Button className="w-full" disabled={isSubmitting} type="submit">
              Finalizar cadastro
            </Button>

            <p className="text-muted-foreground px-6 text-center text-sm leading-relaxed">
              Ao continuar, você concorda com nossos{" "}
              <a className="underline underline-offset-4" href="">
                Termos de serviço
              </a>{" "}
              e{" "}
              <a className="underline underline-offset-4" href="">
                Política de Privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
