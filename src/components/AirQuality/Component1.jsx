import React, { useState, useEffect } from 'react';
import { getUrl } from '../Connectivity/storageHelper';

const Component1 = ({ selectedSearch }) => {
  const [state, setState] = useState({
    value: 60, // Default initial value
    color: 'transparent',
  });

  const [pollution, setPollution] = useState([]);

  useEffect(() => {
    getPollutionData();
  }, [selectedSearch]);

  const getPollutionData = async () => {
    try {
      const apiurl = getUrl();
      const response = await fetch(apiurl);
      const data = await response.json();
      console.log('DATA:', data);
      setPollution(data);

      // Set state.value to the AQI value from the first data entry
      if (data.length > 0) {
        setState((prevState) => ({
          ...prevState,
          value: data[0].AQI,
        }));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const setColorForValue = (value) => {
    let color;

    if (value <= 50) {
      color = '#24c45c';
    } else if (value <= 100) {
      color = '#ecb40c';
    } else if (value <= 200) {
      color = '#fc7414';
    } else if (value <= 300) {
      color = '#ec4444';
    } else if (value <= 400) {
      color = '#7c1c1c';
    } else {
      color = '#5c1c84';
    }

    setState((prevState) => ({
      ...prevState,
      color,
    }));
  };

  useEffect(() => {
    setColorForValue(state.value);
  }, [state.value]);

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC',
    };

    const formattedDate = new Date(dateString).toLocaleString('en-US', options);

    return formattedDate;
  };

  return (
    <>
      <div className="relative rounded-2xl h-full">
        <div className="absolute inset-0 rounded-2xl"></div>
        <div className="p-6 sm:p-12 rounded-2xl relative z-10 flex flex-col gap-9">
          <div className="C1-txt-1 mb-6 sm:mb-11">
            {pollution.map((pol) => (
              <h1 key={pol.id} className="text-2xl sm:text-4xl mb-2 sm:mb-3">{pol.Station}</h1>
            ))}
            {pollution.map((pol) => (
              <p key={pol.id} className="text-slate-500 text-xs sm:text-sm">
                Real-time PM2.5, PM10 air pollution level {pol.State}
              </p>
            ))}
          </div>
          <div className="C1-txt-2 flex flex-col sm:flex-row">
            <div className="C1-p1 flex flex-col justify-center gap-1 mb-4 sm:mb-0">
              {pollution.map((pol) => (
                <p key={pol.id} className="text-slate-500 text-xs sm:text-sm">
                  Last Update: {(pol.Pol_Date)}
                </p>
              ))}
              {pollution.map((pol) => (
                <button
                  key={pol.id}
                  style={{
                    background: state.color,
                  }}
                  className={`Warning p-1 rounded-3xl px-3 mt-2 text-white mr-14`}
                >
                  {pol.AQI_Quality}
                </button>
              ))}
            </div>
            <div className="C1-p2 mx-auto flex flex-col items-center">
              {pollution.map((pol) => (
                <h1
                  key={pol.id}
                  style={{
                    color: state.color,
                  }}
                  className={`text-6xl sm:text-8xl font-bold`}
                >
                  {pol.AQI}
                </h1>
              ))}
              <p className="text-slate-600">(AQI)</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component1;
