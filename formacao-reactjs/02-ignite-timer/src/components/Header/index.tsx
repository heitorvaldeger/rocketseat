import logoIgnite from "@/assets/images/logo-ignite.svg";
import { Scroll, Timer } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

import { HeaderContainer } from "./styles";

export const Header = () => {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
};
