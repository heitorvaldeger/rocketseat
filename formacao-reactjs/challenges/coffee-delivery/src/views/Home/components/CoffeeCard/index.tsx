import { CoffeeCardBadge, CoffeeCardBadgeContainer, CoffeeCardContainer, CoffeeCardDescription, CoffeeCardFooter, CoffeeCardFooterPrice, CoffeeCardTitle } from "./styles";
import { Coffee } from "@/models/coffee";
import { useEffect, useState } from "react";
import { CoffeeCardActions } from "../CoffeeCardActions";

type CoffeeCardProps = {
  coffee: Coffee
}

export const CoffeeCard = ({ coffee }: CoffeeCardProps) => {
  const [coverPath, setCoverPath] = useState('')

  const priceCoffeeAsCurrencyBrazilStyle =
    coffee.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const currencyValue = priceCoffeeAsCurrencyBrazilStyle.slice(3)

  useEffect(() => {
    const fetchImage = async () => {
      const response = await import(`@/assets/images/coffees/${coffee.coverKey}.svg`) // change relative path to suit your needs
      setCoverPath(response.default)
    }

  fetchImage()
  }, [coffee.coverKey])

  return (
    <CoffeeCardContainer>
      {coverPath && <img src={coverPath} />}
      <CoffeeCardBadgeContainer>
        {
          coffee.badges?.map(badge => (
            <CoffeeCardBadge key={badge}>{badge}</CoffeeCardBadge>
          ))
        }
      </CoffeeCardBadgeContainer>
      <CoffeeCardTitle>{coffee.name}</CoffeeCardTitle>
      <CoffeeCardDescription>{coffee.description}</CoffeeCardDescription>

      <CoffeeCardFooter>
        <CoffeeCardFooterPrice>
          R$ <span>{currencyValue}</span>
        </CoffeeCardFooterPrice>
        <CoffeeCardActions coffee={coffee}/>
      </CoffeeCardFooter>
    </CoffeeCardContainer>
  );
};
