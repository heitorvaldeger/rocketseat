import { Address } from "@/models/address";
import { Coffee } from "@/models/coffee";
import { Order } from "@/models/order";
import { PaymentMethod } from "@/models/payment-method";
import { addNewCoffeeToCartAction, addNewOrderToCartAction, decrementQuantityInCartAction, deleteCoffeeFromCartAction, incrementQuantityInCartAction } from "@/store/cart/actions";
import { cartReducer } from "@/store/cart/reducer";
import { PropsWithChildren, useContext, createContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type CartContextType = {
  coffees: Coffee[],
  orders: Order[],
  addNewCoffeeToCart: (coffee: Coffee, qty: number) => void,
  incrementQuantityInCart: (coffee: Coffee) => void,
  decrementQuantityInCart: (coffee: Coffee) => void,
  deleteCoffeeFromCart: (coffee: Coffee) => void,
  addNewOrderToCart: (address: Address, paymentMethod: PaymentMethod) => void
}

export const CartContext = createContext({} as CartContextType)
export const CartProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()
  const [cartState, dispatch] = useReducer(cartReducer, {
    coffees: [],
    orders: []
  }, (cartState) => {
    const storedStateAsJSON = localStorage.getItem('@coffee-delivery:cart-state-1.0.0')
    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    }

    return cartState
  })

  useEffect(() => {
    if (cartState) {
      const stateJSON = JSON.stringify(cartState)
      localStorage.setItem('@coffee-delivery:cart-state-1.0.0', stateJSON)
    }
  }, [cartState])

  const addNewCoffeeToCart = (newCoffee: Coffee, qtyItems: number) => {
    toast('Coffee added to cart', {
      type: 'info'
    })
    dispatch(addNewCoffeeToCartAction({
      ...newCoffee,
      qty: qtyItems
    }))
  }

  const incrementQuantityInCart = (coffee: Coffee) => {
    dispatch(incrementQuantityInCartAction(coffee))
  }

  const decrementQuantityInCart = (coffee: Coffee) => {
    dispatch(decrementQuantityInCartAction(coffee))
  }

  const deleteCoffeeFromCart = (coffee: Coffee) => {
    dispatch(deleteCoffeeFromCartAction(coffee.id))
  }

  const addNewOrderToCart = (address: Address, paymentMethod: PaymentMethod) => {
    dispatch(addNewOrderToCartAction(address, paymentMethod, navigate))    
  }

  return (
    <CartContext.Provider value={{
      coffees: cartState.coffees,
      orders: cartState.orders,
      addNewCoffeeToCart,
      incrementQuantityInCart,
      decrementQuantityInCart,
      deleteCoffeeFromCart,
      addNewOrderToCart
    }}>
      { children }
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
};