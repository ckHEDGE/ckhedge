import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"


const Home = () => {
  return (
    <div className="bg-gradient-to-br from-customPurple to-customPink  text-white pt-5 sm:px-20 px-5 grid min-h-[100vh] grid-rows-[auto_1fr_auto]">
    <Navbar />
    <Hero />
    <Footer />
    </div>
  )
}

export default Home