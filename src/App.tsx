import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { SpeedInsights } from '@vercel/speed-insights/react';
import ScrollToTop from '@/components/ScrollToTop';
import StickyCartBar from '@/components/StickyCartBar';
import WhatsAppButton from '@/components/WhatsappButton';
import { CartProvider } from '@/context/CartContext';
import About from '@/pages/About';
import CartPage from '@/pages/Cart';
import CheckoutPage from '@/pages/Checkout';
import HomePage from '@/pages/Home';
import Products from '@/pages/Products';
import Sabores from '@/pages/Sabores';
import Footer from '@/sections/Footer';
import Header from '@/sections/Header';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Header />
        <ToastContainer
          position="top-right"
          autoClose={2800}
          newestOnTop
          theme="colored"
          className="toastify-brand"
        />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/category/:category" element={<Products />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/flavors" element={<Sabores />} />
          </Routes>
        </main>
        <Footer />
        <StickyCartBar />
        <WhatsAppButton />
        <SpeedInsights />
      </Router>
    </CartProvider>
  );
}
