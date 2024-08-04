import { useEffect, useState } from "react";

import CurrencyDropdown from "./CurrencyDropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(1);
  const [fromCurrency, setfromCurrency] = useState("USD");
  const [toCurrency, settoCurrency] = useState("INR");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || ["INR", "EUR"]
  );

  const handleFavorite = (currency) => {
    let updatedFavorites = [...favorites];

    if (favorites.includes(currency)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav !== currency);
    } else {
      updatedFavorites.push(currency);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      console.log(data);
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.log("eror form data fatching", error);
    }
  };
  console.log(currencies);
  const convertCurrrency = async () => {
    if (!amount) return;
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.log("converting currency error", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const swapCurrencies = () => {
    settoCurrency(fromCurrency);
    setfromCurrency(toCurrency);
  };
  return (
    <>
      <div className="max-w-xl mx-auto my-10 p-5 rounded-lg text-black shadow-md shadow-cyan-500 bg-blue-700">
        <h2 className="mb-5 text-white text-2xl font-semibold p-3">Currency Converter</h2>

        <div className=" grid  grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <CurrencyDropdown 
            favorites={favorites}
            setCurrency={setfromCurrency}
            currency={fromCurrency}
            currencies={currencies}
            handleFavorite={handleFavorite}
            title="From"
          />
          <div className="flex justify-center mt-2  mb-0">
            <button
              onClick={swapCurrencies}
              className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
            >
              <HiArrowsRightLeft className="text-xl text-black-700" />
            </button>
          </div>
          <CurrencyDropdown
            favorites={favorites}
            setCurrency={settoCurrency}
            currency={toCurrency}
            currencies={currencies}
            handleFavorite={handleFavorite}
            title="To"
          />
        </div>

        <div className="mt-4 ">
          <label className="block  text-white text-sm  font-medium" htmlFor="amount">
            Amount
          </label>
          <input
            className="green w-full p-2 rounded-lg border  border-gray-500 hover:opacity-80"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="enter amount"
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={convertCurrrency}
            className={`px-5 py-2 bg-white text-blue-900  font-bold rounded-md hover:bg-gray-300 `}
          >
            convert currency
          </button>
        </div>

        <div className="m-5 text-lg p-1 flex justify-center font-medium text-right text-green-900 bg-white">
          Converted Amount : {convertedAmount}
        </div>
      </div>
    </>
  );
};

export default CurrencyConverter;
