import './App.css';
import { useState, useEffect, useReducer } from 'react';

function currencyInfoReducer(state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

function useCurrencyInfo(currency:string) {
  const [state, dispatch] = useReducer(currencyInfoReducer, { data: {} });

  useEffect(() => {
    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`)
      .then((res) => res.json())
      .then((res) => dispatch({ type: 'SET_DATA', payload: res[currency] }));
  }, [currency]);

  return state.data;
}

function App() {
  const [selectedCurrency, setSelectedCurrency] = useState("inr");
  const currencyInfo = useCurrencyInfo(selectedCurrency);

  // Display loading or error state while data is being fetched
  if (!currencyInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>        
        <button onClick={() => console.log(currencyInfo.inr)}>Click me</button>
        <input
          type="text"
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value) } 
          placeholder="ex usd"
        />
      </div>
    </>
  );
}

export default App;
