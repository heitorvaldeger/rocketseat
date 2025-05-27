import { stripe } from "@/lib/stripe";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}
// Fetch by: Client-side (useEffect) / getStaticProps / getServerSideProps
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details?.name;
  const product = session.line_items?.data[0].price?.product as Stripe.Product;
  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};
export default function Success({ customerName, product }: SuccessProps) {
  return (
    <main className="mx-auto flex h-[656px] flex-col items-center justify-center space-y-6">
      <span className="text-2xl text-gray-100">Compra efetuada!</span>
      <div className="from-product-gradient-f to-product-gradient-t flex h-[145px] w-full max-w-[130px] items-center justify-center rounded-lg bg-linear-to-b p-1">
        <Image
          src={product.imageUrl}
          className="object-cover"
          alt=""
          width={130}
          height={145}
        />
      </div>

      <p className="max-w-[560px] text-center text-xl text-gray-300">
        Uhuul <strong>{customerName}</strong>, sua{" "}
        <strong>{product.name}</strong> já está a caminho da sua casa
      </p>

      <Link
        href="/"
        className="block text-lg font-bold text-green-500 decoration-0 hover:text-green-300"
      >
        Voltar ao catálogo
      </Link>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
    </main>
  );
}
