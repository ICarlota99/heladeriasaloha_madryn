import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./sections/Header";
import Home from "./pages/Home";
import About from './pages/About';
import Products from './pages/Products';
import Footer from "./sections/Footer";
import WhatsAppButton from "./components/WhatsappButton";
import { CartProvider } from './components/CartContext';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/category/:category" element={<Products />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
      </Router>
    </CartProvider>
  )
}