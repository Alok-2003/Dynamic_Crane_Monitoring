import { useState } from 'react'
import CraneVisualization from '../components/CraneVisualization';
import LiveCameraFeed from '../components/LiveFeed';
import { Activity, ThermometerSun } from 'lucide-react';

const Crane = () => {
  const [darkMode] = useState(true);
  const stats = {
    totalWorkers: 45,
    activeWorkers: 32,
    workersInDanger: 2,
    temperature: "24°C",
    windSpeed: "12 km/h",
    visibility: "Good",
    systemHealth: 92,
    craneLoad: 75,         // e.g., 75% load capacity
    boomAngle: 45,         // e.g., 45 degrees
    craneTemperature: 60,  // e.g., 60°C
  };
  return (
    <div>
      <div className=" grid lg:grid-cols-2 lg:h-full h-full flex-col  gap-4 mb-4 ">
        {/* Camera Feed */}
        <div className={`rounded-xl   ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>

          <LiveCameraFeed />
        </div>
        <CraneVisualization />
      </div>
      {/* Weather Conditions */}
      <div className={`rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-slate-700' : 'border-slate-200'} p-4`}>
        <div className="flex items-center gap-2 mb-4">
          <ThermometerSun className="text-blue-600" />
          <h2 className="text-xl font-semibold">Weather Conditions</h2>
        </div>
        <div className="space-y-4">
          {[
            { label: "Temperature", value: stats.temperature },
            { label: "Wind Speed", value: stats.windSpeed },
            { label: "Visibility", value: stats.visibility }
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30">
              <span className="text-slate-600 dark:text-slate-300">{item.label}</span>
              <span className="font-semibold text-slate-600 dark:text-slate-300">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* System Health */}
      <div className={`rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-slate-700' : 'border-slate-200'} p-4`}>
        <div className="flex items-center gap-2 mb-4">
          <Activity className="text-blue-600" />
          <h2 className="text-xl font-semibold">System Health</h2>
        </div>
        <div className="relative pt-1">
          <div className="flex mb-3 items-center justify-between">
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border border-green-100 dark:border-green-800">
              Status: Operational
            </span>
            <span className="text-xs font-semibold text-green-600 dark:text-green-400">{stats.systemHealth}%</span>
          </div>
          <div className="h-2 mb-4 text-xs flex rounded bg-green-100 dark:bg-green-900/20">
            <div
              style={{ width: `${stats.systemHealth}%` }}
              className="shadow-none rounded-xl flex text-center whitespace-nowrap text-white justify-center bg-green-500 dark:bg-green-400 transition-all duration-500"
            ></div>
          </div>
          {/* Additional Crane Parameters */}
          <div className=" space-y-4">
            <div className='flex justify-between items-center ' >
              <p className="text-lg text-gray-500 dark:text-gray-400">Load Capacity</p>
              <p className="text-lg font-bold">{stats.craneLoad}%</p>
            </div>
            <div className='flex justify-between items-center '>
              <p className="text-lg text-gray-500 dark:text-gray-400">Boom Angle</p>
              <p className="text-lg font-bold">{stats.boomAngle}°</p>
            </div>
            <div className='flex justify-between items-center ' >
              <p className="text-lg text-gray-500 dark:text-gray-400">Crane Temp</p>
              <p className="text-lg font-bold">{stats.craneTemperature}°C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Crane