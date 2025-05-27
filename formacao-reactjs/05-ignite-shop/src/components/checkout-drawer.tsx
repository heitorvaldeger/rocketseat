"use client";

import { useCheckout } from "@/contexts/checkout-context";
import { ShoppingBag } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import { Drawer } from "vaul";

export default function CheckoutDrawer() {
  const { products, getTotalCheckout, removeProduct } = useCheckout();
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const handleBuyProducts = async () => {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await fetch("/api/checkout", {
        method: "POST",
      });

      const data = await response.json();
      const { checkoutUrl } = data;
      window.location.href = checkoutUrl;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setIsCreatingCheckoutSession(false);
      // Connect an observality tool like Datadog or Sentry
      alert("Falha ao redirecionar ao checkout!");
    }
  };

  return (
    <Drawer.Root direction="right">
      <Drawer.Trigger asChild>
        <div>
          {products.length > 0 && (
            <div className="absolute -mt-2 ml-9 flex w-6 items-center justify-center rounded-full bg-green-300">
              {products.length}
            </div>
          )}
          <button className="cursor-pointer rounded-md bg-gray-800 p-3">
            <ShoppingBag size={24} />
          </button>
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="fixed top-2 right-2 bottom-2 z-10 flex w-[450px] outline-none"
          // The gap between the edge of the screen and the drawer is 8px in this case.
          style={
            { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
          }
        >
          <div className="flex h-full w-full grow flex-col rounded-[16px] bg-gray-800 p-10">
            <div className="mx-auto flex h-full w-full flex-col gap-8">
              <Drawer.Title className="mb-2 text-lg font-bold">
                Sacola de compras
              </Drawer.Title>

              <ul className="flex h-[710px] w-full flex-col gap-5 overflow-y-auto">
                {products.map((product, i) => (
                  <li key={product.id} className="flex gap-5">
                    <div className="from-product-gradient-f to-product-gradient-t flex h-[95px] w-full max-w-[100px] items-center justify-center rounded-lg bg-linear-to-b p-1">
                      <Image
                        src={product.imageUrl}
                        alt=""
                        width={100}
                        height={95}
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2">
                      <span className="text-md font-normal">
                        {product.name}
                      </span>
                      <span className="text-md font-bold">
                        {product.priceFormatted}
                      </span>
                      <button
                        onClick={() => removeProduct(i)}
                        className="w-[65px] cursor-pointer text-green-300"
                      >
                        Remover
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-md font-normal">Quantidade</span>
                  <span className="text-md font-normal">
                    {products.length} itens
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-md font-bold">Valor Total</span>
                  <span className="text-xl font-bold">
                    {getTotalCheckout()}
                  </span>
                </div>

                <div className="my-8">
                  <button
                    onClick={handleBuyProducts}
                    disabled={isCreatingCheckoutSession}
                    className="text-md w-full cursor-pointer rounded-lg bg-green-500 px-8 py-5 font-bold"
                  >
                    Finalizar compra
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
