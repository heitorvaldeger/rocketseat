import { ProductModel } from "@/models/product";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface CheckoutContextValues {
  products: ProductModel[];
  getTotalCheckout: () => string;
  addProduct: (product: ProductModel) => void;
  removeProduct: (id: number) => void;
}

export const CheckoutContext = createContext({} as CheckoutContextValues);

export const CheckoutProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    fetch("/api/products-cart", {
      method: "GET",
    }).then(async (value) => {
      const response = await value.json();
      console.log(response);
      setProducts(response.products);
    });
  }, []);

  const addProduct = (product: ProductModel) => {
    fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({
        id: product.id,
        priceId: product.defaultPriceId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setProducts((prev) => [...prev, product]);
    });
  };

  const removeProduct = (id: number) => {
    setProducts((prevState) => prevState.filter((product, i) => i !== id));
  };

  const getTotalCheckout = () => {
    return products
      .reduce((acc, current) => {
        return (acc += current.price);
      }, 0)
      .toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
  };

  return (
    <CheckoutContext
      value={{
        getTotalCheckout,
        addProduct,
        removeProduct,
        products,
      }}
    >
      {children}
    </CheckoutContext>
  );
};

export const useCheckout = () => {
  return useContext(CheckoutContext);
};
