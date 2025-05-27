import { Outlet } from "react-router-dom"
import { Header } from "@/components/Header"
import { LayoutContainer, MainContainer } from "./styles"
import { CartProvider } from "@/contexts/CartContext"

export const DefaultLayout = () => {
  return (
    <LayoutContainer>
      <CartProvider>
        <Header/>
        <MainContainer>
          <Outlet />
        </MainContainer>
      </CartProvider>
    </LayoutContainer>
  )
}