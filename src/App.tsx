import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Menu from './sections/Menu'
import About from './sections/About'
import Gallery from './sections/Gallery'
import Reservation from './sections/Reservation'
import Contact from './sections/Contact'

// Composição da página: header fixo + secções, na ordem em que aparecem
// na navegação (ver NAV_ITEMS em components/Header.tsx).
function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Menu />
        <About />
        <Gallery />
        <Reservation />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
