import { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

const LiveCameraFeed = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cameraActive, setCameraActive] = useState(true);
  const [model, setModel] = useState<any>(null);

  // Start the camera
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

  // Load the object detection model
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  // Detect objects continuously
  useEffect(() => {
    let animationFrameId: number;
    const detectFrame = async () => {
      if (videoRef.current && model && canvasRef.current) {
        const predictions = await model.detect(videoRef.current);
        drawPredictions(predictions);
      }
      animationFrameId = requestAnimationFrame(detectFrame);
    };

    if (cameraActive && model) {
      detectFrame();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [cameraActive, model]);

  // Draw bounding boxes and labels
  const drawPredictions = (predictions: any[]) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !videoRef.current) return;

    // Match canvas size to video dimensions
    ctx.canvas.width = videoRef.current.videoWidth;
    ctx.canvas.height = videoRef.current.videoHeight;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    predictions.forEach((prediction) => {
      const [x, y, width, height] = prediction.bbox;
      ctx.strokeStyle = "#FF0000";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      ctx.font = "18px Arial";
      ctx.fillStyle = "#FF0000";
      ctx.fillText(
        `${prediction.class} (${Math.round(prediction.score * 100)}%)`,
        x,
        y > 10 ? y - 5 : 10
      );
    });
  };

  return (
    <div className={`rounded-xl overflow-hidden ${cameraActive ? 'bg-slate-800' : 'bg-gray-200'} shadow-sm border ${cameraActive ? 'border-slate-700' : 'border-slate-200'}`}>
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <Camera className="text-blue-600" />
          <h2 className="text-xl font-semibold">Live Camera Feed</h2>
        </div>
      </div>
      <div className="relative aspect-video bg-slate-900 overflow-hidden">
        <video
          ref={videoRef}
          className="w-full object-cover"
          autoPlay
          playsInline
          style={{ display: "block" }}
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />
        <div className="absolute top-4 left-4 bg-red-500 px-3 py-1 rounded-full text-white text-sm font-medium flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          LIVE
        </div>
      </div>
    </div>
  );
};

export default LiveCameraFeed;
