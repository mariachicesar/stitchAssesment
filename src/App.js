import logo from './logo.svg';
import './App.css';
import Location from './components/Location';
import Weather from './components/Weather';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <Location /> */}
        <Weather />
      </header>
    </div>
  );
}

export default App;
