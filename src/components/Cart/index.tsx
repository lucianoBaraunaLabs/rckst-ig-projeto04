import * as Dialog from "@radix-ui/react-dialog";
import { CartButton } from "../CartButton";
import { CartClose, CartContent, CartFinalization, CartProduct, CartProductDetails, CartProductImage, FinalizationDetails } from "./styles";
import { X } from "phosphor-react";
import Image from "next/image";

export function Cart() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton />
      </Dialog.Trigger>

      <Dialog.Portal>
        <CartContent>
          <CartClose>
            <X size={24} weight="bold" />
          </CartClose>

          <h2>Seu carrinho</h2>

          <section>
            <p>Parece que seu carrinho está vazio...</p>
            <CartProduct>
              <CartProductImage>
                {/* <Image width={100} height={93} alt="nome do produto" /> */}
              </CartProductImage>
              <CartProductDetails>
              <p>Produto</p>
                  <strong>50.00</strong>
                  <button onClick={() => console.log("Remover produto")}>
                    Remover
                  </button>
              </CartProductDetails>
            </CartProduct>
              <CartFinalization>
                <FinalizationDetails>
                  <div>
                    <span>Quantidade</span>
                    <p>2 itens</p>
                  </div>
                  <div>
                    <span>Valor total</span>
                    <p>R$500.00</p>
                  </div>
                </FinalizationDetails>
                <button>Finalizar compra</button>
              </CartFinalization>
          </section>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}