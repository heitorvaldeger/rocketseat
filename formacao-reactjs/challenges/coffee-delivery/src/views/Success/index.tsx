import { MapPin, Timer, CurrencyDollar } from "@phosphor-icons/react"
import { useTheme } from 'styled-components'
import { Container, Order, Heading, InfoContent, Info } from "./styles"
import { useParams } from "react-router-dom"
import { useCartContext } from "@/contexts/CartContext"
import { PAYMENT_METHODS } from "@/constans/payment-methods"

import deliveryImage from '@/assets/images/delivery.svg'

export const SuccessView = () => {
  const theme = useTheme()
  const params = useParams()

  const { orders } = useCartContext()

  const lastOrder = orders.find(order => order.id === params.id)
  if (!lastOrder) {
    return null
  }

  return (
    <Container>
      <Order>
        <Heading>
          <h2>Uhu! Pedido confirmado</h2>
          <span>Agora é só aguardar que logo o café chegará até você</span>
        </Heading>

        <Info>
          <InfoContent>
            <div>
              <MapPin
                color={theme.colors.white}
                style={{ backgroundColor: theme.colors.purple }}
                size={32}
              />

              <div>
                <span>
                  Entrega em{' '}
                  <strong>
                    {lastOrder.address.street}, {lastOrder.address.number}
                  </strong>
                </span>

                <span>
                  {lastOrder.address.district} - {lastOrder.address.city},{lastOrder.address.state}
                </span>
              </div>
            </div>

            <div>
              <Timer
                color={theme.colors.white}
                style={{ backgroundColor: theme.colors.yellow }}
                size={32}
              />

              <div>
                <span>Previsão de entrega</span>

                <strong>20 min - 30 min</strong>
              </div>
            </div>

            <div>
              <CurrencyDollar
                color={theme.colors.white}
                style={{ backgroundColor: theme.colors["yellow-dark"] }}
                size={32}
              />

              <div>
                <span>Pagamento na entrega</span>

                <strong>{PAYMENT_METHODS[lastOrder.paymentMethod]}</strong>
              </div>
            </div>
          </InfoContent>
        </Info>
      </Order>

      <img src={deliveryImage} alt="Pedido concluído" />
    </Container>
  )
}