import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Pagination } from ".";

describe("Pagination", () => {
  it("must display the right amount of pages and results", () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={() => {}}
      />,
    );

    expect(wrapper.getByText("Página 1 de 20")).toBeInTheDocument();
    expect(wrapper.getByText("Total de 200 item(s)")).toBeInTheDocument();
  });

  it("must be able to navigate to the next page", async () => {
    const onPageChangeCallback = vi.fn();

    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const nextPageButton = wrapper.getByRole("button", {
      name: "Próxima página",
    });

    const user = userEvent.setup();
    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(1);
  });

  it("must be able to navigate to the previous page", async () => {
    const onPageChangeCallback = vi.fn();

    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const nextPageButton = wrapper.getByRole("button", {
      name: "Página anterior",
    });

    const user = userEvent.setup();
    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(4);
  });

  it("must be able to navigate to the first page", async () => {
    const onPageChangeCallback = vi.fn();

    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const nextPageButton = wrapper.getByRole("button", {
      name: "Primeira página",
    });

    const user = userEvent.setup();
    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(0);
  });

  it("must be able to navigate to the last page", async () => {
    const onPageChangeCallback = vi.fn();

    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const nextPageButton = wrapper.getByRole("button", {
      name: "Última página",
    });

    const user = userEvent.setup();
    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(19);
  });

  it("must be the first page disabled when the pageIndex is equal at 0", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={() => {}}
      />,
    );

    expect(
      wrapper.getByRole("button", {
        name: "Primeira página",
      }),
    ).toBeDisabled();
  });

  it("must be the first page disabled when the pageIndex is less at 0", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={-1}
        totalCount={200}
        perPage={10}
        onPageChange={() => {}}
      />,
    );

    expect(
      wrapper.getByRole("button", {
        name: "Primeira página",
      }),
    ).toBeDisabled();
  });

  it("must be the last page disabled when the pageIndex is equal at the last page count", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={20}
        totalCount={200}
        perPage={10}
        onPageChange={() => {}}
      />,
    );

    expect(
      wrapper.getByRole("button", {
        name: "Última página",
      }),
    ).toBeDisabled();
  });

  it("must be the last page disabled when the pageIndex is more at the last page count", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={21}
        totalCount={200}
        perPage={10}
        onPageChange={() => {}}
      />,
    );

    expect(
      wrapper.getByRole("button", {
        name: "Última página",
      }),
    ).toBeDisabled();
  });
});
