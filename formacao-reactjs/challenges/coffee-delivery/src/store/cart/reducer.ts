/* eslint-disable no-case-declarations */
import { Coffee } from "@/models/coffee"
import { ActionsEnum } from "./actions"
import { Order } from "@/models/order"
import { v4 } from "uuid"

interface CartState {
  coffees: Coffee[],
  orders: Order[]
}

export const cartReducer = (state: CartState, action: any) => {
  switch (action.type) {
    case ActionsEnum.ADD_NEW_COFFEE_TO_CHECKOUT:
      const coffeeInCart =
        state.coffees.find((coffee) => coffee.id === action.payload.id)
      if (coffeeInCart) {
        const totalQty = coffeeInCart.qty + action.payload.qty
        if (totalQty > 10) {
          return state;
        }
        
        coffeeInCart.qty = totalQty;

        return {
          ...state,
          coffees: [
            ...state.coffees.map(coffee => {
              if (coffee.id === coffeeInCart.id) {
                return {
                  ...coffeeInCart
                }
              }
              return coffee
            })
          ]
        }
      }
      return {
        ...state,
        coffees: [...state.coffees, action.payload]
      } as CartState

    case ActionsEnum.INCREMENT_QUANTITY_IN_CHECKOUT:
      return {
        ...state,
        coffees: [...state.coffees.map(coffee => {
          if (coffee.id === action.payload.id) {
            return {
              ...coffee,
              qty: coffee.qty + 1
            }
          }
  
          return coffee
        })]
      }
    case ActionsEnum.DECREMENT_QUANTITY_IN_CHECKOUT:
      return {
        ...state,
        coffees: [...state.coffees.map(coffee => {
          if (coffee.id === action.payload.id) {
            return {
              ...coffee,
              qty: coffee.qty - 1
            }
          }
  
          return coffee
        })]
      }
    
    case ActionsEnum.DELETE_COFFEE_FROM_CART:
      return {
        ...state,
        coffees: [...state.coffees.filter(coffee => {
          return coffee.id !== action.payload  
        })]
      }

    case ActionsEnum.ADD_NEW_ORDER_TO_CART:
      const { address, paymentMethod, navigate } = action.payload
      const newOrder: Order = {
        id: v4(),
        address,
        paymentMethod,
        coffees: state.coffees
      }

      navigate(`success/${newOrder.id}`)
      return {
        ...state,
        coffees: [],
        orders: [...state.orders, newOrder],
      }
    default:
      return state
  }
}