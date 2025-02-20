import  { useState } from 'react';
import { MapPin, Users, ThermometerSun, Activity, Bell, } from 'lucide-react';
import LiveCameraFeed from './components/LiveFeed';
import CustomMap from './components/CustomMap';
import CraneDropdown from './components/CraneDropdown';

function App() {
  const [darkMode] = useState(true);
  const handleCraneSelect = (crane: number) => {
    console.log("Selected crane:", crane);
  };
  // Simulated data
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


  const recentAlerts = [
    { id: 1, message: "Worker approaching restricted zone", time: "2 mins ago", severity: "high" },
    { id: 2, message: "High wind speed detected", time: "5 mins ago", severity: "medium" },
    { id: 3, message: "Crane load at 85% capacity", time: "10 mins ago", severity: "low" }
  ];

  return (
    <div className={`h-screen ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Main Content */}
      <div className="absolute top-3 left-0 right-1/2 z-10 p-4 flex justify-end">
        <CraneDropdown onSelect={handleCraneSelect} />
      </div>
      <main className=" mx-auto p-4   gap-6">
        {/* Top Row */}
        <div className=" grid grid-cols-2 h-1/3   gap-4 mb-4 ">
          {/* Camera Feed */}
          <div className={`rounded-xl   ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>

            <LiveCameraFeed />
          </div>

          {/* Map */}
          <div className={`rounded-xl   ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <MapPin className="text-blue-600" />
                <h2 className="text-xl font-semibold">Site Map & Hazard Zones</h2>
              </div>
            </div>

            <div className="p-4 h-[85%] z-20" > 
              <CustomMap />
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          {/* Worker Stats */}
          <div className={`rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-slate-700' : 'border-slate-200'} p-4`}>
            <div className="flex items-center gap-2 mb-4">
              <Users className="text-blue-600" />
              <h2 className="text-xl font-semibold">Worker Status</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                <p className="text-sm text-blue-600 dark:text-blue-400">Total Workers</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.totalWorkers}</p>
              </div>
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                <p className="text-sm text-green-600 dark:text-green-400">Active Workers</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{stats.activeWorkers}</p>
              </div>
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 col-span-2">
                <p className="text-sm text-red-600 dark:text-red-400">Workers in Danger Zone</p>
                <p className="text-2xl font-bold text-red-700 dark:text-red-300">{stats.workersInDanger}</p>
              </div>
            </div>
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
                  <p className="text-sm text-gray-500 dark:text-gray-400">Load Capacity</p>
                  <p className="text-xl font-bold">{stats.craneLoad}%</p>
                </div>
                <div className='flex justify-between items-center '>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Boom Angle</p>
                  <p className="text-xl font-bold">{stats.boomAngle}°</p>
                </div>
                <div className='flex justify-between items-center ' >
                  <p className="text-sm text-gray-500 dark:text-gray-400">Crane Temp</p>
                  <p className="text-xl font-bold">{stats.craneTemperature}°C</p>
                </div>
              </div>
            </div>
          </div>


          {/* Recent Alerts */}
          <div className={`rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-slate-700' : 'border-slate-200'} p-4`}>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="text-blue-600" />
              <h2 className="text-xl font-semibold">Recent Alerts</h2>
            </div>
            <div className="space-y-3">
              {recentAlerts.length > 0 ? (
                recentAlerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border ${alert.severity === 'high'
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800'
                      : alert.severity === 'medium'
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-800'
                        : 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800'
                      }`}
                  >
                    <div className="flex justify-between items-center text-sm ">
                      <span className={`font-medium ${alert.severity === 'high'
                        ? 'text-red-700 dark:text-red-300'
                        : alert.severity === 'medium'
                          ? 'text-yellow-700 dark:text-yellow-300'
                          : 'text-blue-700 dark:text-blue-300'
                        }`}>{alert.message}</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">{alert.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">No recent alerts.</p>
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;