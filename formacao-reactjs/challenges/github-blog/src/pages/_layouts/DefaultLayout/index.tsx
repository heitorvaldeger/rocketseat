import { Outlet } from "react-router-dom"
import { Header } from "../../../components/Header"
import { LayoutContent } from "./styles"

export const DefaultLayout = () => {
  return (
    <>
      <Header />
      <LayoutContent>
        <Outlet />
      </LayoutContent>
    </>
  )
}