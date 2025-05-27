import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryRouter, MemoryRouter, RouterProvider } from "react-router";
import { SignIn } from "./sign-in";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/lib/react-query";
import userEvent from "@testing-library/user-event";
import { routesConfig } from "@/routes";
import { Toaster } from "sonner";
import { signIn } from "@/api/sign-in";

vi.mock("/src/api/sign-in");

describe("SignIn", () => {
  const mockSignIn = vi.mocked(signIn);

  beforeEach(() => {
    mockSignIn.mockClear();
  });

  it("must set default email input value if email is present on search params", () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => {
        return (
          <MemoryRouter initialEntries={["/sign-in?email=johndoe@example.com"]}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </MemoryRouter>
        );
      },
    });

    const emailInput = wrapper.getByLabelText("Seu e-mail") as HTMLInputElement;
    expect(emailInput.value).toBe("johndoe@example.com");
  });

  it("must show the sign-up page if button sign-up clicked", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/sign-in"],
    });
    const wrapper = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    const signUpLink = wrapper.getByRole("link", {
      name: "Novo estabelecimento",
    });

    fireEvent.click(signUpLink);

    expect(screen.getByText(/Criar conta grátis/i)).toBeInTheDocument();
  });

  it("must disable the button Painel Access when the form is submitting", async () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => {
        return (
          <MemoryRouter initialEntries={["/sign-in?email=johndoe@example.com"]}>
            <QueryClientProvider client={queryClient}>
              {children}
              <Toaster />
            </QueryClientProvider>
          </MemoryRouter>
        );
      },
    });

    const painelAccessButton = wrapper.getByRole("button", {
      name: "Acessar painel",
    }) as HTMLButtonElement;

    fireEvent.click(painelAccessButton);

    expect(painelAccessButton).toBeDisabled();
  });

  it("must show toast success when sign in resolves with success", async () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => {
        return (
          <MemoryRouter initialEntries={["/sign-in?email=johndoe@example.com"]}>
            <QueryClientProvider client={queryClient}>
              {children}
              <Toaster />
            </QueryClientProvider>
          </MemoryRouter>
        );
      },
    });
    const painelAccessButton = wrapper.getByRole("button", {
      name: "Acessar painel",
    }) as HTMLButtonElement;
    const user = userEvent.setup();
    await user.click(painelAccessButton);

    expect(
      screen.getByText("Enviamos um link de autenticação para seu email!"),
    ).toBeInTheDocument();
  });

  it("must show toast failed when sign in resolves with failure", async () => {
    mockSignIn.mockRejectedValueOnce(null);

    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => {
        return (
          <MemoryRouter initialEntries={["/sign-in?email=johndoe@example.com"]}>
            <QueryClientProvider client={queryClient}>
              {children}
              <Toaster />
            </QueryClientProvider>
          </MemoryRouter>
        );
      },
    });
    const painelAccessButton = wrapper.getByRole("button", {
      name: "Acessar painel",
    }) as HTMLButtonElement;
    const user = userEvent.setup();
    await user.click(painelAccessButton);

    expect(screen.getByText("Credenciais inválidas")).toBeInTheDocument();
  });
});
