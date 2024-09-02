import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import './App.css';
import { FaArrowCircleDown } from "react-icons/fa";

//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

function App() {

  const [rates, setRates] = useState([]);
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [forex, setForex] = useState('buying');
  const [result, setResult] = useState(0);

  const [weather, setWeather] = useState();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const cities = useMemo(() => [
    { name: 'Adana', lat: 37.0019, lon: 35.3288 },
    { name: 'Adıyaman', lat: 37.7644, lon: 38.2760 },
    { name: 'Afyonkarahisar', lat: 38.7565, lon: 30.5433 },
    { name: 'Ağrı', lat: 39.7198, lon: 41.1121 },
    { name: 'Aksaray', lat: 38.3684, lon: 34.0318 },
    { name: 'Amasya', lat: 40.6534, lon: 35.8310 },
    { name: 'Ankara', lat: 39.9334, lon: 32.8597 },
    { name: 'Antalya', lat: 36.8841, lon: 30.7056 },
    { name: 'Artvin', lat: 41.1826, lon: 41.1800 },
    { name: 'Aydın', lat: 37.8556, lon: 27.8416 },
    { name: 'Balıkesir', lat: 39.6544, lon: 27.8828 },
    { name: 'Bartın', lat: 41.6356, lon: 32.3374 },
    { name: 'Batman', lat: 37.8871, lon: 41.1390 },
    { name: 'Bayburt', lat: 40.2532, lon: 40.2232 },
    { name: 'Bilecik', lat: 40.0656, lon: 29.9834 },
    { name: 'Bingöl', lat: 38.8833, lon: 40.3833 },
    { name: 'Bitlis', lat: 38.5712, lon: 42.1071 },
    { name: 'Bolu', lat: 40.7354, lon: 31.6261 },
    { name: 'Burdur', lat: 37.7660, lon: 30.3733 },
    { name: 'Bursa', lat: 40.1927, lon: 29.0840 },
    { name: 'Çanakkale', lat: 40.1530, lon: 26.4142 },
    { name: 'Çankırı', lat: 40.6016, lon: 33.6211 },
    { name: 'Çorum', lat: 40.5534, lon: 34.9550 },
    { name: 'Denizli', lat: 37.7750, lon: 29.0870 },
    { name: 'Diyarbakır', lat: 37.9074, lon: 40.1169 },
    { name: 'Düzce', lat: 40.8433, lon: 31.1567 },
    { name: 'Edirne', lat: 41.6772, lon: 26.5550 },
    { name: 'Elazığ', lat: 38.6806, lon: 39.2268 },
    { name: 'Erzincan', lat: 39.7333, lon: 39.5000 },
    { name: 'Erzurum', lat: 41.2720, lon: 41.6814 },
    { name: 'Eskişehir', lat: 39.7760, lon: 30.5206 },
    { name: 'Gaziantep', lat: 37.0662, lon: 37.3833 },
    { name: 'Giresun', lat: 40.9127, lon: 38.3893 },
    { name: 'Gümüşhane', lat: 40.4578, lon: 39.4639 },
    { name: 'Hakkari', lat: 37.5720, lon: 43.7333 },
    { name: 'Hatay', lat: 36.2028, lon: 36.1628 },
    { name: 'Iğdır', lat: 40.3825, lon: 44.0082 },
    { name: 'Isparta', lat: 37.7647, lon: 30.5569 },
    { name: 'İstanbul', lat: 41.0082, lon: 28.9784 },
    { name: 'İzmir', lat: 38.4192, lon: 27.1287 },
    { name: 'Kahramanmaraş', lat: 37.5736, lon: 36.9374 },
    { name: 'Karabük', lat: 41.2084, lon: 32.6249 },
    { name: 'Karaman', lat: 37.1734, lon: 33.2166 },
    { name: 'Kars', lat: 40.6069, lon: 43.0774 },
    { name: 'Kastamonu', lat: 41.3891, lon: 33.5812 },
    { name: 'Kayseri', lat: 38.7331, lon: 35.4786 },
    { name: 'Kırıkkale', lat: 39.8455, lon: 33.5158 },
    { name: 'Kırklareli', lat: 41.7333, lon: 27.2167 },
    { name: 'Kırşehir', lat: 39.1438, lon: 34.1667 },
    { name: 'Kilis', lat: 37.0740, lon: 37.1200 },
    { name: 'Kocaeli', lat: 40.8333, lon: 29.9167 },
    { name: 'Konya', lat: 37.8700, lon: 32.4846 },
    { name: 'Kütahya', lat: 39.4167, lon: 29.9833 },
    { name: 'Malatya', lat: 38.3550, lon: 38.3091 },
    { name: 'Manisa', lat: 38.6191, lon: 27.4289 },
    { name: 'Mardin', lat: 37.3166, lon: 40.7242 },
    { name: 'Mersin', lat: 36.8133, lon: 34.6411 },
    { name: 'Muğla', lat: 37.2144, lon: 28.3634 },
    { name: 'Muş', lat: 40.0200, lon: 41.7350 },
    { name: 'Nevşehir', lat: 38.6240, lon: 34.7117 },
    { name: 'Niğde', lat: 37.9667, lon: 34.6833 },
    { name: 'Ordu', lat: 40.9833, lon: 37.8667 },
    { name: 'Osmaniye', lat: 37.2333, lon: 36.2500 },
    { name: 'Rize', lat: 41.0206, lon: 40.5236 },
    { name: 'Sakarya', lat: 40.8500, lon: 30.4000 },
    { name: 'Samsun', lat: 41.2867, lon: 36.33 },
    { name: 'Siirt', lat: 37.9667, lon: 41.9333 },
    { name: 'Sinop', lat: 42.0097, lon: 35.1680 },
    { name: 'Sivas', lat: 39.7500, lon: 37.0167 },
    { name: 'Şanlıurfa', lat: 37.1667, lon: 38.7833 },
    { name: 'Şırnak', lat: 42.0064, lon: 44.8164 },
    { name: 'Tekirdağ', lat: 40.9756, lon: 27.5100 },
    { name: 'Tokat', lat: 40.3183, lon: 36.5600 },
    { name: 'Trabzon', lat: 41.0027, lon: 39.7228 },
    { name: 'Tunceli', lat: 39.0667, lon: 39.5167 },
    { name: 'Uşak', lat: 38.6825, lon: 29.4083 },
    { name: 'Van', lat: 38.4936, lon: 43.3910 },
    { name: 'Yalova', lat: 40.6500, lon: 29.2667 },
    { name: 'Yozgat', lat: 39.8189, lon: 34.8122 },
    { name: 'Zonguldak', lat: 41.4500, lon: 31.8000 }
  ], []);

  const key = 'a98750491fbd7c2acf042ba719a40cf5';
  const getWeatherData = async (lat, lon) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=tr&units=metric`);

      setWeather(response.data);
    } catch (error) {
      alert("Veri alınırken hata oluştu")
    }

  }
  const handleCityChange = (event) => {
    const city = cities.find(city => city.name === event.target.value);
    if (city) {
      setSelectedCity(city);
      getWeatherData(city.lat, city.lon);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        error => {
          console.error(error);
          alert("Konum alınırken bir hata oluştu.");
        }
      );
    } else {
      alert("Geolocation desteklenmiyor.");
    }
  }, []);
  useEffect(() => {
    if (latitude && longitude) {
      getWeatherData(latitude, longitude);
    }

  }, [latitude, longitude]);

  // console.log(latitude, longitude, weather.main.temp);
  useEffect(() => {
    if (selectedCity) {
      getWeatherData(selectedCity.lat, selectedCity.lon);
    }
    else {
      setSelectedCity(cities.find(city => city.name === weather?.name))
    }
  }, [selectedCity, cities, weather?.name]);



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
        <div>
          <div className='evaluation' style={{ marginTop: '20px' }}>
            <select value={forex} onChange={(e) => setForex(e.target.value)} className='forex'>
              <option value={'buying'}>ALIŞ</option>
              <option value={'selling'}>SATIŞ</option>
            </select>
            <button onClick={exchange} className='button'>HESAPLA</button>
          </div>
        </div>
        <hr style={{ marginTop: '10px' }}></hr>

        <div className='weather'>
          <h2>HAVA DURUMU</h2>
          <div>
            <select className='weather_select' onChange={handleCityChange} value={selectedCity ? selectedCity.name : ''}>
              {cities.map(city => (
                <option key={city.name} value={city.name}>
                  {city.name.toUpperCase()}
                </option>
              ))}
            </select>
            {weather ? (
              <div>
                <h4>{Math.round(weather.main.temp)}°C</h4>
              </div>
            ) : (
              <p>Veri yükleniyor...</p>
            )}
          </div>
        </div>
      </div>

    </div >
  );
}

export default App
