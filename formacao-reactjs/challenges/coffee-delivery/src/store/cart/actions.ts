import { Address } from "@/models/address";
import { Coffee } from "@/models/coffee";
import { PaymentMethod } from "@/models/payment-method";
import { NavigateFunction } from "react-router-dom";

export enum ActionsEnum {
  ADD_NEW_COFFEE_TO_CHECKOUT = "ADD_NEW_COFFEE_TO_CHECKOUT",
  INCREMENT_QUANTITY_IN_CHECKOUT = 'INCREMENT_QUANTITY_IN_CHECKOUT',
  DECREMENT_QUANTITY_IN_CHECKOUT = 'DECREMENT_QUANTITY_IN_CHECKOUT',
  DELETE_COFFEE_FROM_CART = 'DELETE_COFFEE_FROM_CART',
  ADD_NEW_ORDER_TO_CART = 'ADD_NEW_ORDER_TO_CART'
}

export const addNewCoffeeToCartAction = (coffee: Coffee) => ({
  type: ActionsEnum.ADD_NEW_COFFEE_TO_CHECKOUT,
  payload: coffee,
});

export const incrementQuantityInCartAction = (coffee: Coffee) => ({
  type: ActionsEnum.INCREMENT_QUANTITY_IN_CHECKOUT,
  payload: coffee,
});

export const decrementQuantityInCartAction = (coffee: Coffee) => ({
  type: ActionsEnum.DECREMENT_QUANTITY_IN_CHECKOUT,
  payload: coffee,
});

export const deleteCoffeeFromCartAction = (coffeeId: number) => ({
  type: ActionsEnum.DELETE_COFFEE_FROM_CART,
  payload: coffeeId,
});

export const addNewOrderToCartAction = (address: Address, paymentMethod: PaymentMethod, navigate: NavigateFunction) => ({
  type: ActionsEnum.ADD_NEW_ORDER_TO_CART,
  payload: {
    address,
    paymentMethod,
    navigate
  },
});