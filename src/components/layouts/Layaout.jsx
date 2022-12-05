import { Header } from '../navbar/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from '../navbar/Footer';

export const Layout = () => {

  return (
    <div>
      <Header />
      <section>
        <Outlet />
      </section>
      <Footer />
    </div>
  );
}


