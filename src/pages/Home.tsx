import Delivery from '@/sections/Delivery';
import Flavors from '@/sections/Flavors';
import Hero from '@/sections/Hero';
import Shop from '@/sections/Shop';
import Whyus from '@/sections/Whyus';

export default function Home() {
  return (
    <>
      <Hero />
      <Shop />
      <Flavors />
      <Whyus />
      <Delivery />
    </>
  );
}
