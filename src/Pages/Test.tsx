import  { useState } from 'react';

const Test = () => {
  const [craneState, setCraneState] = useState({
    trolleyPosition: 100,
    jibAngle: 0,
    loadWeight: 5000,
    counterweightWeight: 8000,
    stringLength: 50 // initial string length in pixels
  });

  const moveTrolley = (direction: 'left' | 'right') => {
    setCraneState(prev => ({
      ...prev,
      trolleyPosition: direction === 'left'
        ? Math.max(0, prev.trolleyPosition - 5)
        : Math.min(100, prev.trolleyPosition + 5)
    }));
  };

  const rotateJib = (direction: 'left' | 'right') => {
    setCraneState(prev => ({
      ...prev,
      jibAngle: direction === 'left'
        ? Math.max(0, prev.jibAngle - 5)
        : Math.min(60, prev.jibAngle + 5)
    }));
  };

  const loosenString = () => {
    setCraneState(prev => ({
      ...prev,
      stringLength: Math.min(100, prev.stringLength + 5)
    }));
  };

  const tightenString = () => {
    setCraneState(prev => ({
      ...prev,
      stringLength: Math.max(20, prev.stringLength - 5)
    }));
  };

  return (
    <div className="w-full h-[600px] bg-white relative overflow-hidden">
      {/* Base */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-yellow-300"></div>
      
      {/* Tower Structure */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-12 bg-yellow-400 h-96">
        {/* Lattice-like structure */}
        <div className="absolute inset-0 grid grid-cols-2 gap-1">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="bg-gray-600 h-2 opacity-50"></div>
          ))}
        </div>
      </div>
      
      {/* Jib (Horizontal Arm) */}
      <div 
        className="absolute bottom-[440px] left-1/2 origin-bottom transform -translate-x-4/5" 
        style={{ 
          rotate: `${craneState.jibAngle}deg`,
          transition: 'rotate 0.3s ease'
        }}
      >
        {/* Truss-like jib structure */}
        <div className="w-[500px] h-8 relative">
          <div className="absolute inset-0 grid grid-cols-10 gap-1">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="bg-gray-700 h-2 opacity-70"></div>
            ))}
          </div>
          
          {/* Trolley with String and Load */}
          <div 
            className="absolute -bottom-10 left-0 w-full flex flex-col items-center" 
            style={{ 
              left: `calc(${craneState.trolleyPosition}% - 500px)`,
              transition: 'left 0.3s ease'
            }}
          >
            {/* Trolley */}
            <div className="w-12 h-8 bg-gray-500"></div>
            {/* String */}
            <div
              style={{
                height: `${craneState.stringLength}px`, // String length
                width: '2px',
                backgroundColor: 'black',
                transition: 'height 0.3s ease',
              }}
            ></div>
            {/* Load (Cube) */}
            <div
              className="w-12 h-8 bg-gray-600"
              style={{
                marginTop: `${-craneState.stringLength}px`, // Move the load down as string length increases
                transition: 'margin-top 0.3s ease',
              }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Counterweight */}
      <div className="absolute bottom-[416px] right-1/2 transform translate-x-1/2 w-24 h-16 bg-black"></div>
      
      {/* Controls */}
      <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button onClick={() => moveTrolley('left')} className="bg-gray-200 px-4 py-2 rounded">
          Move Trolley Left
        </button>
        <button onClick={() => moveTrolley('right')} className="bg-gray-200 px-4 py-2 rounded">
          Move Trolley Right
        </button>
        <button onClick={() => rotateJib('left')} className="bg-gray-200 px-4 py-2 rounded">
          Rotate Jib Left
        </button>
        <button onClick={() => rotateJib('right')} className="bg-gray-200 px-4 py-2 rounded">
          Rotate Jib Right
        </button>
        <button onClick={loosenString} className="bg-gray-200 px-4 py-2 rounded">
          Loosen String
        </button>
        <button onClick={tightenString} className="bg-gray-200 px-4 py-2 rounded">
          Tighten String
        </button>
      </div>
    </div>
  );
};

export default Test;
