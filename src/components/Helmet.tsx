import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Activity } from 'lucide-react';
import { useFirebase } from '../context/firebase'; // Access Firebase context

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

interface SystemHealthProps {
  darkMode: boolean;
  stats: {
    systemHealth: number;
    craneLoad: number;
    boomAngle: number;
    craneTemperature: number;
  };
}

const Helmet: React.FC<SystemHealthProps> = ({ stats = { systemHealth: 0, craneLoad: 0, boomAngle: 0, craneTemperature: 0 } }) => {
  const { HelmetData } = useFirebase(); // Access the HelmetData function from Firebase context
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [timestamps, setTimestamps] = useState<number[]>([]); // Track the time series
  const [latitudeData, setLatitudeData] = useState<number[]>([]); // Track latitude data points
  const [longitudeData, setLongitudeData] = useState<number[]>([]); // Track longitude data points
  const darkMode = true; 
  // Fetch data from Firebase when the component mounts
  useEffect(() => {
    // Fetch data using the HelmetData function and listen for updates
    const interval = setInterval(() => {
      HelmetData(); // Call the function to fetch the data from Firebase
      
      // For demonstration, assuming HelmetData updates context that contains lat/long values
      const data = { lat: 30.762489666666667, long: 76.5983285 };  // This should come from HelmetData
      if (data && data.lat && data.long) {
        setLatitude(data.lat);
        setLongitude(data.long);

        const currentTime = Date.now(); // Get current timestamp
        setTimestamps((prevTimestamps) => [...prevTimestamps, currentTime]);
        setLatitudeData((prevLatitudeData) => [...prevLatitudeData, data.lat]);
        setLongitudeData((prevLongitudeData) => [...prevLongitudeData, data.long]);
      }
    }, 1000); // Update every 1 second with new data

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [HelmetData]); // Ensure the function is being used correctly and state updates

  // Chart Data for Latitude and Longitude over Time
  const chartData = {
    labels: timestamps, // Use timestamps directly as x-values
    datasets: [
      {
        label: 'Latitude',
        data: latitudeData, // Latitude data
        borderColor: darkMode ? 'rgba(75,192,192,1)' : 'rgba(0, 123, 255, 1)', // Greenish for Latitude in dark mode, blue in light mode
        backgroundColor: darkMode ? 'rgba(75,192,192,0.2)' : 'rgba(0, 123, 255, 0.2)', // Background color for Latitude
        fill: false,
        tension: 0.1, // Smooth line
      },
      {
        label: 'Longitude',
        data: longitudeData, // Longitude data
        borderColor: darkMode ? 'rgba(153, 102, 255, 1)' : 'rgba(255, 99, 132, 1)', // Purple for Longitude in dark mode, red in light mode
        backgroundColor: darkMode ? 'rgba(153, 102, 255, 0.2)' : 'rgba(255, 99, 132, 0.2)', // Background color for Longitude
        fill: false,
        tension: 0.1, // Smooth line
      },
    ],
  };

  // Chart Options
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Location (Latitude and Longitude) Change Over Time',
        color: darkMode ? '#ffffff' : '#000000', // Title color for dark mode and light mode
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          labelColor: function(context) {
            return {
              borderColor: darkMode ? 'white' : 'black',
              backgroundColor: darkMode ? 'white' : 'black',
            };
          },
        },
      },
    },
    scales: {
      x: {
        type: 'linear', // Use linear scale to plot time-based data
        position: 'bottom',
        title: {
          display: true,
          text: 'Time',
          color: darkMode ? '#ffffff' : '#000000', // x-axis title color
        },
        ticks: {
          // Format ticks to display as time for readability
          callback: function(value: number) {
            return new Date(value).toLocaleTimeString(); // Display time as HH:mm:ss
          },
          color: darkMode ? '#ffffff' : '#000000', // Tick color
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
          color: darkMode ? '#ffffff' : '#000000', // y-axis title color
        },
        beginAtZero: true,
        ticks: {
          color: darkMode ? '#ffffff' : '#000000', // Tick color
        },
      },
    },
  };

  return (
    <div className={`rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-slate-700' : 'border-slate-200'} p-4`}>
      <div className="mt-0">
        <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400">Latitude and Longitude Chart (Over Time)</h3>
        <div className="w-full mt-4">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Helmet;
