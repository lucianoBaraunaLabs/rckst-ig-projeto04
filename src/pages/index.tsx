import Image from "next/image"
import Head from "next/head"
import { HomeContainer, Product, SliderContainer } from "../styles/pages/home"



import { stripe } from "@/lib/stripe"
import { GetStaticProps } from "next"
import Stripe from "stripe"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { CartButton } from "@/components/CartButton"
import { IProduct } from "@/contexts/CartContext"
import { useCart } from "@/hooks/useCart"
import { ProductSkeleton } from "@/components/ProductSkeleton"
import { useEffect, useState } from "react"

interface HomeProps {
  products: IProduct[]
}

export default function Home({ products }: HomeProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fake loading to use the skeleton loading from figma
    const timeOut = setTimeout(() => setIsLoading(false), 2000);

    return () => clearTimeout(timeOut);
  }, []);

  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  })
  const { addToCart, checkIfItemAlreadyExists } = useCart()

  function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>, product: IProduct) {
    e.preventDefault();
    addToCart(product);
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer>
        <div className="embla">
          <div ref={emblaRef}>
            <SliderContainer>
              {isLoading ? (
                 <>
                 <ProductSkeleton className="embla__slide" />
                 <ProductSkeleton className="embla__slide" />
                 <ProductSkeleton className="embla__slide" />
               </>
              ) : (
                <>
                  {products.map((product) => {
                    return (
                      <Link
                        href={`/product/${product.id}`}
                        key={product.id}
                        prefetch
                        className="embla__slide"
                      >
                        <Product key={product.id} className="embla__slide"

                        >
                          <Image src={product.imageUrl} width={520} height={480} alt="" />

                          <footer>
                            <div>
                              <strong>{product.name}</strong>
                              <span>{product.price}</span>
                            </div>
                            <CartButton size="large"  color="green" disabled={checkIfItemAlreadyExists(product.id)} onClick={(e) => handleAddToCart(e, product)} />
                          </footer>
                        </Product>
                      </Link>
                    )
                  })}
                </>
              )}
            </SliderContainer>
          </div>
        </div>
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount && new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100),
      numberPrice: price.unit_amount && price.unit_amount / 100,
      defaultPriceId: price.id,
    }
  })


  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
