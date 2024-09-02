import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import { FaArrowCircleDown } from "react-icons/fa";


function App() {

  const [rates, setRates] = useState([]);
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [forex, setForex] = useState('buying');
  const [result, setResult] = useState(0);


  useEffect(() => {
    const exchangeRates = async () => {

      const response = await axios.get('https://hasanadiguzel.com.tr/api/kurgetir');

      console.log('API Yanıtı:', response.data);

      const currencyData = response.data.TCMB_AnlikKurBilgileri;


      if (Array.isArray(currencyData)) {
        const ratesData = currencyData.map(item => ({
          code: item.Isim,
          buying: item.ForexBuying,
          selling: item.ForexSelling
        }));

        const filteredRatesData = ratesData.filter(rate => rate.code !== "ÖZEL ÇEKME HAKKI (SDR)                            ");
        setRates(filteredRatesData);

        setFromCurrency(filteredRatesData[0]?.code)

      } else {
        throw new Error('Yanıt beklenen formatta değil');
      }

    };

    exchangeRates();
  }, []);


  const exchange = () => {
    console.log(amount);
    console.log(fromCurrency);
    console.log(forex);
    const selectedRate = rates.find(rate => rate.code === fromCurrency);
    if (forex === 'buying') {
      const result = selectedRate ? amount * selectedRate.buying : 0;
      setResult(result);
    }
    else {
      const result = selectedRate ? amount * selectedRate.selling : 0;
      setResult(result);
    }

  }

  return (
    <div className="App">
      <div className='exchangeRates'>
        <div>
          <h1>GÜNCEL DÖVİZ KURLARI</h1>
          <table>
            <thead>
              <tr>
                <th>DÖVİZ KODU</th>
                <th>ALIŞ FİYATI</th>
                <th>SATIŞ FİYATI</th>
              </tr>
            </thead>
            <tbody>
              {rates.map(rate => (
                <tr key={rate.code}>
                  <td>{rate.code}</td>
                  <td>{rate.buying}</td>
                  <td>{rate.selling}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='exchangeArea'>
        <div className='from'>
          <h1>DÖVİZ HESAPLAMA</h1>
          <hr></hr>
          <div className='options'>
            <select onChange={(e) => setFromCurrency(e.target.value)} className='fromCurrency'>
              {rates.map(rate => (
                <option key={rate.code}>{rate.code}</option>
              ))}
            </select>

            <input value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} type="float" className='amount'></input>

          </div>
        </div>
        <FaArrowCircleDown className='arrow' />
        <div className='to'>
          <div className='options'>
            {/* <select className='toCurrency'>
              {rates.map(rate => (
                <option key={rate.code}>{rate.code}</option>
              ))}
            </select> */}
            <select className='toCurrency'><option>TRY</option></select>
            <input value={result} type="float" className='amount' readOnly></input>

          </div>
        </div>
        <hr style={{ marginTop: '20px' }}></hr>
        <div className='evaluation'>
          <select value={forex} onChange={(e) => setForex(e.target.value)} className='forex'>
            <option value={'buying'}>ALIŞ</option>
            <option value={'selling'}>SATIŞ</option>
          </select>
          <button onClick={exchange} className='button'>HESAPLA</button>
        </div>
      </div>

    </div >
  );
}

export default App
