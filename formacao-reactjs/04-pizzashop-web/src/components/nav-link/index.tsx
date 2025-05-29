import { Link, LinkProps, useLocation } from "react-router";

export type NavLinkProps = LinkProps;

export const NavLink = (props: NavLinkProps) => {
  const { pathname } = useLocation();

  return (
    <Link
      className="text-muted-foreground hover:text-foreground data-[current=true]:text-foreground flex items-center gap-1.5 text-sm font-medium"
      data-current={pathname === props.to}
      {...props}
    />
  );
};
