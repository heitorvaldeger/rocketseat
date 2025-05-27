import { ShoppingCartSimple } from "@phosphor-icons/react";
import { CoffeeCardFooterCartButton } from "./styles";
import { useCartContext } from "@/contexts/CartContext";
import { CoffeeQuantityButton } from "../../../../components/CoffeeQuantityButton";
import { useState } from "react";
import { Coffee } from "@/models/coffee";

type CoffeeCardActionsProps = {
  coffee: Coffee
}

export const CoffeeCardActions = (props: CoffeeCardActionsProps) => {
  const [quantity, setQuantity] = useState(1)

  const { coffee } = props
  const { addNewCoffeeToCart } = useCartContext()
  const handleIncrementQuantityInProduct = () => {
    setQuantity(prevState => prevState + 1)
  }
  const handleDecrementQuantityInProduct = () => {
    setQuantity(prevState => prevState - 1)
  }

  return (
    <div>
      <CoffeeQuantityButton
        quantity={quantity}
        onIncrementQuantityInProduct={handleIncrementQuantityInProduct}
        onDecrementQuantityInProduct={handleDecrementQuantityInProduct}
      />
      <CoffeeCardFooterCartButton onClick={() => addNewCoffeeToCart(coffee, quantity)}>
        <ShoppingCartSimple size={22} weight="fill" />
      </CoffeeCardFooterCartButton>
    </div>
  );
};
