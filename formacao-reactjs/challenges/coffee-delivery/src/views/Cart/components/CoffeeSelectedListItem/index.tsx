import { Trash } from "@phosphor-icons/react";
import { CoffeeSelectedListItemActionDelete, CoffeeSelectedListItemActions, CoffeeSelectedListItemContainer, CoffeeSelectedListItemDescription, CoffeeSelectedListItemInfo, CoffeeSelectedListItemPrice } from "./styles";
import { Coffee } from "@/models/coffee";
import { useEffect, useState } from "react";
import { CoffeeQuantityButton } from "@/components/CoffeeQuantityButton";
import { useCartContext } from "@/contexts/CartContext";

type CoffeeSelectedListItemProps = {
  coffee: Coffee;
};

export const CoffeeSelectedListItem = ({ coffee }: CoffeeSelectedListItemProps) => {
  const [coverPath, setCoverPath] = useState("");

  const {
    incrementQuantityInCart,
    decrementQuantityInCart,
    deleteCoffeeFromCart
  } = useCartContext()

  const totalItem = coffee.qty * coffee.price;
  const totalAsCurrencyBrazilStyle = totalItem.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  useEffect(() => {
    const fetchImage = async () => {
      const response = await import(`@/assets/images/coffees/${coffee.coverKey}.svg`); // change relative path to suit your needs
      setCoverPath(response.default);
    };

    fetchImage();
  }, [coffee.coverKey]);

  return (
    <CoffeeSelectedListItemContainer>
      <CoffeeSelectedListItemDescription>
        {coverPath && <img src={coverPath} />}
        <CoffeeSelectedListItemInfo>
          <p>{coffee.name}</p>
          <CoffeeSelectedListItemActions>
            <CoffeeQuantityButton
              height="2rem"
              quantity={coffee.qty}
              onIncrementQuantityInProduct={() => incrementQuantityInCart(coffee)}
              onDecrementQuantityInProduct={() => decrementQuantityInCart(coffee)}
            />

            <CoffeeSelectedListItemActionDelete
              type="button"
              onClick={() => deleteCoffeeFromCart(coffee)}
            >
              <Trash size={16} />
              Remover
            </CoffeeSelectedListItemActionDelete>
          </CoffeeSelectedListItemActions>
        </CoffeeSelectedListItemInfo>
      </CoffeeSelectedListItemDescription>
      <CoffeeSelectedListItemPrice>{totalAsCurrencyBrazilStyle}</CoffeeSelectedListItemPrice>
    </CoffeeSelectedListItemContainer>
  );
};
