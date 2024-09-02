import React, { useState, useEffect } from 'react'
import axios from 'axios'
function App() {
  const [rates, setRates] = useState([]);


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
        setRates(ratesData);
      } else {
        throw new Error('Yanıt beklenen formatta değil');
      }

    };

    exchangeRates();
  }, []);


  return (
    <div className="App">
      <h1>Güncel Döviz Kurları</h1>
      <table>
        <thead>
          <tr>
            <th>Döviz Kodu</th>
            <th>Alış Fiyatı</th>
            <th>Satış Fiyatı</th>
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
  );
}

export default App
