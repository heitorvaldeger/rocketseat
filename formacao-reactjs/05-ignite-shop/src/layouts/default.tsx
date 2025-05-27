import Image from "next/image";
import igniteShopLogo from "../../public/ignite-shop-logo.svg";
import { PropsWithChildren } from "react";
import CheckoutDrawer from "@/components/checkout-drawer";

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col items-start justify-center">
      <header className="mx-auto my-0 flex w-full max-w-[1180px] items-center justify-between py-8">
        <Image src={igniteShopLogo} alt="Ignite Shop Logo" />
        <CheckoutDrawer />
      </header>
      {children}
    </div>
  );
}
