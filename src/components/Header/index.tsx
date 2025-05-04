import Link from "next/link";
import logoImage from '@/assets/logo.svg';
import Image from 'next/image'
import { HeaderContainer } from "./styles";
import { Cart } from "../Cart";
import { useRouter } from "next/router";


export function Header() {
  const { pathname } = useRouter();

  const showCartButton = pathname !== "/success";

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImage} alt="Logo Ignite Shop" />
      </Link>
      {showCartButton && <Cart />}
    </HeaderContainer>
  );
}