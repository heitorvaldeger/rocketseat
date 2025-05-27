/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCheckout } from "@/contexts/checkout-context";
import { stripe } from "@/lib/stripe";
import { ProductModel } from "@/models/product";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Stripe from "stripe";

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await stripe.products.list();

  return {
    paths: products.data.map((product) => ({
      params: {
        id: product.id,
      },
    })),
    fallback: true,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id ?? "";
  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;
  const priceFormatted = ((price.unit_amount ?? 0) / 100).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    },
  );
  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        url: product.url,
        price: (price.unit_amount ?? 0) / 100,
        priceFormatted,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};

interface ProductProps {
  product: ProductModel;
}
export default function ProductItem({ product }: ProductProps) {
  const { isFallback } = useRouter();
  const { addProduct } = useCheckout();
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const handleBuyProduct = async () => {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({ priceId: product.defaultPriceId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      const { checkoutUrl } = data;
      window.location.href = checkoutUrl;
    } catch (error) {
      setIsCreatingCheckoutSession(false);
      // Connect an observality tool like Datadog or Sentry
      alert("Falha ao redirecionar ao checkout!");
    }
  };

  const handleAddProductToCheckout = () => {
    addProduct(product);
  };

  if (isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <main className="mx-auto my-0 grid max-w-[1180px] grid-cols-2 items-stretch gap-16">
      <div className="from-product-gradient-f to-product-gradient-t flex h-[calc(656px-0.5rem)] w-full max-w-[576px] items-center justify-center rounded-lg bg-linear-to-b p-1">
        <Image src={product.imageUrl} alt="" width={520} height={480} />
      </div>

      <div className="flex flex-col">
        <p className="text-2xl text-gray-300">{product.name}</p>
        <span className="mt-4 block text-2xl text-green-300">
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>

        <p className="text-md mt-10 leading-7 text-gray-300">
          {product.description}
        </p>

        <button
          onClick={handleAddProductToCheckout}
          className="text-md mt-auto cursor-pointer rounded-lg border-0 bg-green-500 p-5 font-bold text-white hover:bg-green-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Colocar na sacola
        </button>
      </div>
      <Head>
        <title>{product.name.toString()} | Ignite Shop</title>
      </Head>
    </main>
  );
}
