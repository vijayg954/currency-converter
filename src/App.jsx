import "./App.css";
import CurrencyConvertor from "./components/CurrencyConverter";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/2313070/pexels-photo-2313070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" ) `,
      }}
      className="min-h-screen flex flex-col items-center bg-cover justify-center"
    >
      <div className="container ">
        <CurrencyConvertor />
      </div>
    </div>
  );
}

export default App;
