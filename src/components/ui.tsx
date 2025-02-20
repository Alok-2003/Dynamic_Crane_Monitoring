import { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";

const LiveCameraFeed = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className={`rounded-xl h- ${cameraActive ? 'bg-slate-800' : 'bg-gray-200'} shadow-sm border ${cameraActive ? 'border-slate-700' : 'border-slate-200'}`}>
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <Camera className="text-blue-600" />
          <h2 className="text-xl font-semibold">Live Camera Feed</h2>
        </div>
      </div>
      <div className="p-4">
        <div className="aspect-video bg-slate-900 rounded-lg relative overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
          />
          <div className="absolute top-4 left-4 bg-red-500 px-3 py-1 rounded-full text-white text-sm font-medium flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            LIVE
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCameraFeed;

implement object detection thorough camera