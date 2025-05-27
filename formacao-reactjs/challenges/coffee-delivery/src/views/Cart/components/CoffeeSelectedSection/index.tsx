import { useCartContext } from "@/contexts/CartContext"
import { CoffeeSelectedListItem } from "../CoffeeSelectedListItem"
import {
  CoffeeSelectedSectionContainer,
  CoffeeSelectedSummary,
  CoffeeSelectedTotal,
  CoffeeSelectedConfirmOrder,
  SectionTitle
} from "./styles"
import { formatCurrencyBRL } from "@/utils/format-currency-brl"

export const CoffeeSelectedSection = () => {
  const { coffees } = useCartContext()
  const deliveryTax = coffees.length ? 3.50 : 0
  const totalItems = coffees.reduce((acc, coffee) => {
    acc += coffee.price * coffee.qty
    return acc
  }, 0)
  const totalFull = deliveryTax + totalItems

  const deliveryTaxBrazilianFormat = formatCurrencyBRL(deliveryTax);
  const totalItemsBrazilianFormat = formatCurrencyBRL(totalItems);
  const totalFullBrazilianFormat = formatCurrencyBRL(totalFull);

  return (
    <CoffeeSelectedSectionContainer>
        <SectionTitle>Cafés selecionados</SectionTitle>

        <main>
          <ul>
            {coffees.map(coffee => (
              <CoffeeSelectedListItem
                key={coffee.id}
                coffee={coffee}
              />
            ))}
          </ul>

          <CoffeeSelectedSummary>
            <div>
              <p>Total de itens</p>
              <p>R$ {totalItemsBrazilianFormat}</p>
            </div>
            <div>
              <p>Entrega</p>
              <p>R$ {deliveryTaxBrazilianFormat}</p>
            </div>
            <CoffeeSelectedTotal>
              <p>Total</p>
              <p>R$ {totalFullBrazilianFormat}</p>
            </CoffeeSelectedTotal>
          </CoffeeSelectedSummary>

          <CoffeeSelectedConfirmOrder disabled={!totalFull}>
            Confirmar Pedido
          </CoffeeSelectedConfirmOrder>
        </main>
      </CoffeeSelectedSectionContainer>
  )
}