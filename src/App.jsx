import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout'
import Sabores from './pages/Sabores';
import Header from './sections/Header';
import HomePage from "./pages/Home";
import About from './pages/About';
import Products from './pages/Products';
import Footer from './sections/Footer';
import WhatsAppButton from './components/WhatsappButton';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <ToastContainer position='top-right' autoClose={3000} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<About />} />
          <Route path='/category/:category' element={<Products />} />
          <Route path='/cart' element={<CartPage />} /> 
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/flavors' element={<Sabores />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
      </Router>
    </CartProvider>
  )
}