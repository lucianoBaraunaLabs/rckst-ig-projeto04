import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'


import {Container} from '@/styles/pages/app'
import { Header } from '@/components/Header'
import { CartContextProvider } from '@/contexts/CartContext'


globalStyles()

function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  )
}

export default App