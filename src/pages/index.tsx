import Image from "next/image"
import Head from "next/head"
import { HomeContainer, Product, SliderContainer } from "../styles/pages/home"



import { stripe } from "@/lib/stripe"
import { GetStaticProps } from "next"
import Stripe from "stripe"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { CartButton } from "@/components/CartButton"

interface HomeProps {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer>
        <div className="embla">
          <div ref={emblaRef}>
            <SliderContainer>
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
                        <CartButton size="large"  color="green" />
                      </footer>
                    </Product>
                  </Link>
                )
              })}
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
      }).format(price.unit_amount / 100)
    }
  })


  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
