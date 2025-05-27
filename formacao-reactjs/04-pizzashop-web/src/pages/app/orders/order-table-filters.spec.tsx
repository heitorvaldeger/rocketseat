import { fireEvent, render } from "@testing-library/react";
import { OrderTableFilters } from "./order-table-filters";
import { MemoryRouter } from "react-router";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/lib/react-query";

describe("Order Table Filters", () => {
  it("must clear filters params when the button filters remove is clicked", () => {
    const wrapper = render(<OrderTableFilters />, {
      wrapper: ({ children }) => {
        return (
          <MemoryRouter
            initialEntries={[
              "/orders?orderId=any_id&status=pending&customerName=any_name",
            ]}
          >
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </MemoryRouter>
        );
      },
    });

    const status = wrapper.getByTestId("status") as HTMLSpanElement;
    const idPedido = wrapper.getByPlaceholderText(
      "ID do pedido",
    ) as HTMLInputElement;
    const customerName = wrapper.getByPlaceholderText(
      "Nome do cliente",
    ) as HTMLInputElement;

    const filtersRemoveButton = wrapper.getByRole("button", {
      name: "Remover filtros",
    }) as HTMLButtonElement;

    fireEvent.click(filtersRemoveButton);

    expect(status.textContent).toBe("");
    expect(idPedido.value).toBe("");
    expect(customerName.value).toBe("");
  });
});
