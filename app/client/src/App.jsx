import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./sections/Header";
import Home from "./pages/Home";
import About from './pages/About';
// import Products from './pages/Products';
// import Contact from './pages/Contact';
import Footer from "./sections/Footer";
import WhatsAppButton from "./components/WhatsappButton";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/products" element={<Products />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
      <Footer />
      <WhatsAppButton />
    </Router>
    // <>
    //   <Header />
    //   <Home />
    //   <WhatsAppButton />
    // </>
  )
}