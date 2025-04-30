import Link from "next/link";
import logoImage from '@/assets/logo.svg';
import Image from 'next/image'
import { HeaderContainer } from "./styles";
import { Cart } from "../Cart";


export function Header() {
  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImage} alt="Logo Ignite Shop" />
      </Link>
      <Cart />
    </HeaderContainer>
  )
}