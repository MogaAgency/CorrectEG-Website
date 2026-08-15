import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Achievements from './components/Achievements'
import Services from './components/Services'
import HowWeWork from './components/HowWeWork'
import WhyCorrect from './components/WhyCorrect'
import Ethics from './components/Ethics'
import Reviews from './components/Reviews'
import Industries from './components/Industries'
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
        <Achievements />
        <Services />
        <HowWeWork />
        <WhyCorrect />
        <Ethics />
        <Reviews />
        <Industries />
        <Clients />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default App
