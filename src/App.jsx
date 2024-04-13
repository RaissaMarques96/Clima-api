import { useState } from 'react';

export default function App() {
  const [city, setCity] = useState(""); 
  const [weatherForecast, setWeatherForecast] = useState({});

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=f18085571daf4be9b82231841241204&q=${city}&lang=pt`
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        setWeatherForecast(data);
      });
  };

  return (
    <div className="bg-rose-50 w-full h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #87CEEB, #ffffff)'}}>
      <div className="w-[500px] text-center bg-white p-5 px-8 rounded-lg">
        <h1 className="text-4xl font-extralight mb-77">PREVISÃO DO TEMPO</h1>
        <p className="mb-8 font-extralight">
          Verifique a previsão do tempo da sua cidade!
        </p>
        <form className="flex items-center justify-center mb-8">
          <input
            className="border-2 placeholder:text-gray-500 rounded-lg p-2 text-black mr-2"
            placeholder="Digite o nome de uma cidade"
            type="text"
            onChange={handleChange}
            value={city}
          />
          <button
            onClick={handleSearch}
            type="button"
            className="bg-violet-400 hover:bg-violet-500 text-white p-3 px-8 rounded-lg"
          >
            Pesquisar
          </button>
        </form>
        {weatherForecast && weatherForecast.current && (
          <div>
            <div className='flex items-center justify-center'>
              <img src={weatherForecast.current.condition.icon} alt="Weather Icon" />
            </div>
            <div>
              <div>
                <h2 className='font-semibold  '>Clima: {weatherForecast.current.condition.text}</h2>
                <h3 className='font-semibold text-3xl'>{weatherForecast.current.temp_c}°C </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}