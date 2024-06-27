import React, { useState, useEffect } from "react";
import { getBaseUrl, getStationName } from "../Connectivity/storageHelper";

const Component8 = (selectedSearch) => {
  const [apiData, setApiData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2024");

  useEffect(() => {
    getAqiCalData();
  }, [selectedSearch]);

  const getAqiCalData = async () => {
    const selectstation = getStationName();
    try {
      const baseurl = getBaseUrl();
      console.log(baseurl);
      const response = await fetch(`${baseurl}get-AqiCalData/?pol_Station=${selectstation}`);
      const data = await response.json();
      setApiData(data);
      console.log("Response:", response);
      console.log("Data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const filteredData = apiData.filter((entry) =>
    selectedYear ? entry.Pol_Date?.startsWith(selectedYear) : false
  );

  const monthsData = filteredData.reduce((acc, entry) => {
    const month = entry.Pol_Date?.split("-")[1];
    if (month) {
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(entry);
    }
    return acc;
  }, {});

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const getColorBasedOnAQI = (aqi) => {
    if (aqi <= 50) return "#34a12b";
    if (aqi <= 100) return "#ecc93d";
    if (aqi <= 200) return "#e9572a";
    if (aqi <= 300) return "#ec4d9f";
    if (aqi <= 400) return "#9858a2";
    return "#c11e2f";
  };

  const uniqueYears = [...new Set(apiData.map(entry => entry.Pol_Date?.split("-")[0]))].sort();

  return (
    <div className="cal-container m-8">
      <div className="cal-txt flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-2xl text-black font-bold text-start mb-2 md:mb-0">
          AQI Calendar
        </h1>
        <div className="markings flex flex-row mt-4 md:mt-0">
          <div className="w-24 h-7 bg-[#34a12b] flex justify-center items-center">
            <span className="text-white text-sm">0 - 50</span>
          </div>
          <div className="w-24 h-7 bg-[#d4cc0f] flex justify-center items-center">
            <span className="text-white text-sm">51 - 100</span>
          </div>
          <div className="w-24 h-7 bg-[#e9572a] flex justify-center items-center">
            <span className="text-white text-sm">101 - 200</span>
          </div>
          <div className="w-24 h-7 bg-[#ec4d9f] flex justify-center items-center">
            <span className="text-white text-sm">201 - 300</span>
          </div>
          <div className="w-24 h-7 bg-[#9858a2] flex justify-center items-center">
            <span className="text-white text-sm">301 - 400</span>
          </div>
          <div className="w-24 h-7 bg-[#c11e2f] flex justify-center items-center">
            <span className="text-white text-sm">401 - 500</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 mt-4">
        <label className="text-lg font-semibold">Select Year: </label>
        <select value={selectedYear} onChange={handleYearChange} className="border p-2">
          {uniqueYears.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {selectedYear && (
        <div className="cal mt-5 grid grid-cols-3 md:grid-cols-4 gap-2">
          {Object.entries(monthsData)
            .sort((a, b) => a[0] - b[0])
            .map(([month, dates], index) => (
              <div key={index} className="box1">
                <div className="txt-head">
                  <p className="heading">{monthNames[parseInt(month, 10) - 1]}</p>
                </div>
                <div className="innerbox-container">
                  {dates.map((date, innerIndex) => (
                    <div
                      key={innerIndex}
                      className="innerbx1"
                      style={{ backgroundColor: getColorBasedOnAQI(date.AQI) }}
                      title={`Date: ${date.Pol_Date} AQI: ${date.AQI}`}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Component8;
