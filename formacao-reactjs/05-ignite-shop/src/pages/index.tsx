import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}
export async function getStaticProps() {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      url: product.url,
      price: (price.unit_amount ?? 0) / 100,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 30,
  };
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });
  return (
    <>
      <main
        ref={sliderRef}
        className="keen-slider ml-auto flex min-h-[616px] max-w-[calc(1180px+((100vw-1180px)/2))]"
      >
        {products.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="keen-slider__slide group from-product-gradient-f to-product-gradient-t relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-linear-to-b"
          >
            <Image
              className="object-cover"
              src={product.imageUrl}
              width={520}
              height={480}
              alt=""
            />
            <footer className="absolute right-1 bottom-1 left-1 flex translate-y-[110%] items-center justify-between rounded-md bg-black/60 p-8 opacity-0 transition-all delay-200 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
              <strong className="text-lg">{product.name}</strong>
              <span className="text-xl font-bold text-green-300">
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </footer>
          </Link>
        ))}
      </main>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
    </>
  );
}
