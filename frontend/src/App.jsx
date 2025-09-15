
import './App.css';
import Home from './componets/Home';
import Main_Routers from './componets/Main_Routers';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: false, // ✅ ताकि हर बार scroll पर animation चले
    });
  }, []);
  return (
    <>
      <Main_Routers />
    </>
  );
}

export default App;
