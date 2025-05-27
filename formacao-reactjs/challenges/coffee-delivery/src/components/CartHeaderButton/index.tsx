import { ShoppingCart } from "@phosphor-icons/react"
import { ButtonShoppingCart } from "./styles"
import { useCartContext } from "@/contexts/CartContext"
import { useNavigate } from "react-router-dom"

export const CartHeaderButton = () => {
  const { coffees } = useCartContext()
  const navigate = useNavigate()

  const cartItemsCount = coffees.length

  const handleButtonShoppingCartClick = () => {
    navigate('/cart')
  }
  return (
    <ButtonShoppingCart onClick={handleButtonShoppingCartClick}>
      {!!cartItemsCount && <span>{cartItemsCount}</span>}
      <ShoppingCart size={22} weight='fill'/>
    </ButtonShoppingCart>
  )
}