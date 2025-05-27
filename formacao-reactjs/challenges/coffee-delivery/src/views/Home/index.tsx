import { Coffee, Package, ShoppingCart, Timer } from "@phosphor-icons/react";
import coffeeMainImage from "@/assets/images/coffee-main-image.svg";
import {
  CoffeeContainer,
  PackageContainer,
  SectionContainer,
  SectionDetails,
  SectionInfo,
  ShoppingCartContainer,
  TimerContainer,
  TopContainer,
  CoffeeListContainer,
  MainContainer,
} from "./styles";
import { CoffeeCard } from "@/views/Home/components/CoffeeCard";
import { coffees } from "@/__mocks__/coffees";

export const HomeView = () => {
  return (
    <MainContainer>
      <TopContainer>
        <SectionContainer>
          <SectionInfo>
            <p>Encontre o café perfeito para qualquer hora do dia</p>
            <p>Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora</p>
          </SectionInfo>

          <SectionDetails>
            <ShoppingCartContainer>
              <ShoppingCart weight="fill" size={32} />
              <span>Compra simples e segura</span>
            </ShoppingCartContainer>
            <PackageContainer>
              <Package weight="fill" size={32} />
              <span>Embalagem mantém o café intacto</span>
            </PackageContainer>
            <TimerContainer>
              <Timer weight="fill" size={32} />
              <span>Entrega rápida e rastreada</span>
            </TimerContainer>
            <CoffeeContainer>
              <Coffee weight="fill" size={32} />
              <span>O café chega fresquinho até você</span>
            </CoffeeContainer>
          </SectionDetails>
        </SectionContainer>
        <img src={coffeeMainImage} />
      </TopContainer>

      <CoffeeListContainer>
        <p>Nossos cafés</p>

        <ul>
          {
            coffees.map(coffee => <CoffeeCard key={coffee.id} coffee={coffee} />)
          }
        </ul>
      </CoffeeListContainer>
    </MainContainer>
  );
};
