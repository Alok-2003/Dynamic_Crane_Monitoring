import { useState, useEffect, useCallback } from 'react';
import LiveCameraFeed from '../components/LiveFeed';
import {
  Activity,
  ThermometerSun,
  AlertTriangle,
  Shield,
  MapPin,
  TriangleAlert
} from 'lucide-react';

const Crane = () => {
  const [darkMode] = useState(true);

  // Integrated safety system state
  const [safetySystem, setSafetySystem] = useState({
    proximityAlerts: 0,
    hazardZones: [],
    collisionRisk: 'Low',
    emergencyStopStatus: false,
    safetyLog: []
  });

  // Original crane stats with additional safety parameters
  const [stats, setStats] = useState({
    totalWorkers: 45,
    activeWorkers: 32,
    workersInDanger: 2,
    temperature: "24°C",
    windSpeed: "12 km/h",
    visibility: "Good",
    systemHealth: 92,
    craneLoad: 75,
    boomAngle: 45,
    craneTemperature: 60,
    tension: 80,
    pulleyFactor: 1.5,
  });

  // Dynamic Hazard Zone Detection
  const detectHazardZones = useCallback(() => {
    const potentialHazards = [
      'Worker Too Close',
      'Crane Angle Risk',
      'Load Instability'
    ];

    const activeHazards = potentialHazards.filter(() =>
      Math.random() < 0.3 // Simulating occasional hazards
    );

    setSafetySystem(prev => ({
      ...prev,
      proximityAlerts: activeHazards.length,
      hazardZones: activeHazards,
      collisionRisk: activeHazards.length > 1 ? 'High' : 'Medium',
      safetyLog: [
        ...prev.safetyLog,
        ...activeHazards.map(hazard => ({
          timestamp: new Date().toISOString(),
          type: 'Warning',
          description: `Detected: ${hazard}`,
          location: 'Construction Site'
        }))
      ]
    }));
  }, []);

  // Emergency Stop Mechanism
  const triggerEmergencyStop = useCallback(() => {
    setSafetySystem(prev => ({
      ...prev,
      emergencyStopStatus: true,
      safetyLog: [
        ...prev.safetyLog,
        {
          timestamp: new Date().toISOString(),
          type: 'Emergency',
          description: 'Emergency Stop Activated',
          location: 'Construction Site'
        }
      ]
    }));
  }, []);

  // Safe Load Calculation (from original component)
  const calculateSafeLoad = () => {
    const maxWeight = 100 - stats.systemHealth;
    const safeLoad = maxWeight * stats.pulleyFactor;
    return Math.min(safeLoad, 100);
  };

  const isOverloaded = () => {
    return stats.craneLoad > calculateSafeLoad();
  };

  // Periodic safety checks
  useEffect(() => {
    const safetyInterval = setInterval(() => {
      detectHazardZones();

      // Check for critical safety thresholds
      if (
        stats.craneLoad > 90 ||
        safetySystem.proximityAlerts > 2
      ) {
        triggerEmergencyStop();
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(safetyInterval);
  }, [detectHazardZones, triggerEmergencyStop, stats.craneLoad, safetySystem.proximityAlerts]);

  return (
    <div className="w-full h-full">
      <div className="grid lg:grid-cols-2 lg:h-full bg-slate-800 min-h-screen w-full flex-col gap-4 p-4">
        {/* Camera Feed */}
        <div className={`rounded-xl  flex flex-col justify-evenly h-full ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm  ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
          <LiveCameraFeed />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
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
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg text-gray-500 dark:text-gray-400">Load Capacity</p>
                  <p className="text-lg font-bold">{stats.craneLoad}%</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg text-gray-500 dark:text-gray-400">Boom Angle</p>
                  <p className="text-lg font-bold">{stats.boomAngle}°</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg text-gray-500 dark:text-gray-400">Crane Temp</p>
                  <p className="text-lg font-bold">{stats.craneTemperature}°C</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg text-gray-500 dark:text-gray-400">Tension</p>
                  <p className="text-lg font-bold">{stats.tension}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Hazard Zones */}
          <div className={`rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-slate-700' : 'border-slate-200'} p-4`}>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="text-yellow-500" />
              <h2 className="text-xl font-semibold">Active Hazard Zones</h2>
            </div>
            {safetySystem.hazardZones.length > 0 ? (
              <ul className="space-y-2">
                {safetySystem.hazardZones.map((zone, index) => (
                  <li
                    key={index}
                    className="flex items-center bg-yellow-900/20 p-2 rounded-lg"
                  >
                    <MapPin className="mr-2 text-yellow-500" />
                    <span>{zone}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-green-500">No Active Hazard Zones</p>
            )}
          </div>

          {/* Safety Log */}
          <div className={`rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-slate-700' : 'border-slate-200'} p-4`}>
            <div className="flex items-center gap-2 mb-4">
              <TriangleAlert className="text-red-500" />
              <h2 className="text-xl font-semibold">Safety Event Log</h2>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {safetySystem.safetyLog.slice(-5).map((log, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-lg ${log.type === 'Emergency'
                    ? 'bg-red-900/30'
                    : log.type === 'Alert'
                      ? 'bg-yellow-900/30'
                      : 'bg-blue-900/30'
                    }`}
                >
                  <p className="font-semibold">{log.type}: {log.description}</p>
                  <small className="text-slate-400">{log.timestamp}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Safety Alerts Section */}
        {/* {(isOverloaded() || safetySystem.emergencyStopStatus) && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white p-4 rounded-xl shadow-lg w-3/4 z-50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-white" />
              <h2 className="text-lg font-semibold">
                {safetySystem.emergencyStopStatus
                  ? "EMERGENCY STOP ACTIVATED"
                  : "Safety Alert: Crane Overloaded!"
                }
              </h2>
            </div>
            <p className="mt-2">
              {safetySystem.emergencyStopStatus
                ? "Crane operations have been halted due to critical safety concerns."
                : "The crane is currently exceeding its safe load capacity. Please reduce the load to avoid damage or failure."
              }
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Crane;
