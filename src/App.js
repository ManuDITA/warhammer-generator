import logo from './logo.svg';
import './App.css';
import Banner from './components/Banner';
import BannerHandler from './components/BannerHandler';

function App() {
  return (
    <div className="App">
      <BannerHandler></BannerHandler>
      <Banner></Banner>
    </div>
  );
}

export default App;
