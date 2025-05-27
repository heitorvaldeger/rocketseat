import { render } from "@testing-library/react";
import { NavLink } from ".";
import { MemoryRouter } from "react-router";

describe("NavLink", () => {
  it("must highlight the nav link when is the current page link", () => {
    const wrapper = render(
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/abount">About</NavLink>
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={["/abount"]}>{children}</MemoryRouter>
          );
        },
      },
    );

    expect(wrapper.getByText("About").dataset.current).toBe("true");
    expect(wrapper.getByText("Home").dataset.current).toBe("false");
  });
});
