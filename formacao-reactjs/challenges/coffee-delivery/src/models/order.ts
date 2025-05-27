import { Address } from "./address"
import { Coffee } from "./coffee"
import { PaymentMethod } from "./payment-method"

export interface Order {
  id: string,
  coffees: Coffee[],
  address: Address,
  paymentMethod: PaymentMethod
}