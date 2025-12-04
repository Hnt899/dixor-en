import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css/bundle';
import 'react-toastify/dist/ReactToastify.css';
import 'react-modal-video/css/modal-video.css';
import 'react-photo-view/dist/react-photo-view.css';
import 'react-circular-progressbar/dist/styles.css';

import '../src/assets/css/animate.css';
import '../src/assets/css/font-awesome.css';
import '../src/assets/css/flaticon-set.css';

import '../src/assets/css/helper.css';
import '../src/assets/css/validnavs.css';
import '../src/assets/css/style.css'

import Routers from './Routers';
import RoutesScrollToTop from './components/utilities/RoutesScrollToTop';
import Dependency from './components/utilities/Dependency';
import { useEffect, useState } from 'react';
import Preloader from './components/utilities/Preloader';
import { useYandexMetrika } from './hooks/useYandexMetrika';

function App() {
  // Автоматическое отслеживание просмотров страниц в Яндекс.Метрике
  useYandexMetrika();

  //  Preloader 
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Уменьшено время загрузки для лучшей производительности
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading ? <Preloader /> :
        <>
          <Routers />
          <RoutesScrollToTop />
          <Dependency />
        </>
      }
    </>
  )
}

export default App