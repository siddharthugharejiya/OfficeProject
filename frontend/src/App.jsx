
import './App.css';
import Main_Routers from './componets/Main_Routers';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import "toastify-js/src/toastify.css";

function App() {

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: false, // ✅ ताकि हर बार scroll पर animation चले
    });
  }, []);
  return (
    <>
      <div className="container-fluid flex justify-center items-center">

        <div className="container">
          <Main_Routers />
        </div>
      </div>
    </>
  );
}

export default App;
