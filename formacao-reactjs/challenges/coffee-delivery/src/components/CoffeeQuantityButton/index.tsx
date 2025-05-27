import { Minus, Plus } from "@phosphor-icons/react"
import { CoffeeQuantityButtonContainer } from "./styles"

export type CoffeeQuantityButtonProps = {
  height?: number | string,
  quantity: number,
  onIncrementQuantityInProduct: () => void,
  onDecrementQuantityInProduct: () => void
}

export const CoffeeQuantityButton = (props: CoffeeQuantityButtonProps) => {
  const MAX_COFFEE_LIMIT = 10
  const MIN_COFFEE_LIMIT = 1
  const {
    height = '38px',
    quantity,
    onIncrementQuantityInProduct,
    onDecrementQuantityInProduct
  } = props
  
  const handleIncrement = () => {
    if (quantity === MAX_COFFEE_LIMIT) {
      return;
    }
    onIncrementQuantityInProduct()
  }

  const handleDecrement = () => {
    if (quantity === MIN_COFFEE_LIMIT) {
      return;
    }
    onDecrementQuantityInProduct()
  }

  return (
    <CoffeeQuantityButtonContainer height={height}>
      <button type="button" onClick={handleDecrement}>
        <Minus size={14} weight="bold" />
      </button>
      
      <p>{quantity}</p>
      <button type="button" onClick={handleIncrement}>
        <Plus size={14} weight="bold" />
      </button>
    </CoffeeQuantityButtonContainer>
  )
}