import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Shop from "./sections/Shop";
import Flavors from "./sections/Flavors";
import Whyus from "./sections/Whyus";
import Delivery from "./sections/Delivery";
import Contact from "./sections/Contact";
// import Footer from "./sections/Footer";
import WhatsAppButton from "./components/WhatsappButton";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Shop />
      <Flavors />
      <Whyus />
      <Delivery />
      <Contact />
      {/* <Footer />  */}
      <WhatsAppButton />
    </>
  )
}