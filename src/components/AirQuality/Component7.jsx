import React, { useEffect, useState } from "react";
import { getBaseUrl } from "../Connectivity/storageHelper";

const Component7 = () => {
  const [AQIdata, setAQIdata] = useState([]);
  const [timeRange, setTimeRange] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseurl = getBaseUrl();
        const response = await fetch(`${baseurl}get-MetroCityData/?to_date=${timeRange}`);
        const data = await response.json();
        setAQIdata(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [timeRange]);

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  const getIconPath = (city) => {
    return `/icons/${city}.svg`;
  };

  return (
    <div className="p-5">
      <h1 className="text-xl text-[#33a0d3] text-start mb-2">Historical Average Air Quality Data Of Metropolitan Cities</h1>
      <p className="text-sm text-slate-500 mb-4">Details about Pollutant in metropolitan cities</p>

      <div className="mb-4">
        <label htmlFor="timeRange" className="mr-2">Select Time Range:</label>
        <select id="timeRange" value={timeRange} onChange={handleTimeRangeChange} className="p-2 border rounded">
          <option value="0">Last Day</option>
          <option value="6">Last 7 Days</option>
          <option value="14">Last 15 Days</option>
          <option value="29">Last 30 Days</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CO</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NH3</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NO2</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OZONE</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PM25</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PM10</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SO2</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AQI</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {AQIdata.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img src={getIconPath(item.City)} alt={`${item.City} icon`} className="w-7 h-7 mr-2" />
                    <span>{item.City}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.CO}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.NH3}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.NO2}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.OZONE}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.PM25}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.PM10}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.SO2}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.AQI}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Component7;
