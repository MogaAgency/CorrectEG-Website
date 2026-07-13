import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Ethics from './components/Ethics'
import Reviews from './components/Reviews'
import Clients from './components/Clients'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import { useScrollReveal } from './hooks/useScrollReveal'

function App() {
  useScrollReveal()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Ethics />
        <Reviews />
        <Clients />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default App
