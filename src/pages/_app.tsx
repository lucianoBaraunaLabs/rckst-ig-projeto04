import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import logoImage from '@/assets/logo.svg';
import {Container, Header} from '@/styles/pages/app'
import Image from 'next/image'

globalStyles()

function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImage} alt="Logo Ignite Shop" />
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}

export default App