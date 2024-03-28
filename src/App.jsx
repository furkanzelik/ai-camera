import { useEffect, useRef, useState } from "react";
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import Webcam from "react-webcam";
import Hands from "./component/Hands.jsx";
import Coordinates from "./component/Coordinates.jsx";
import Knn from "./component/Knn.jsx";



const videoConstraints = {
    width: 480,
    height: 270,
    facingMode: "user",
};

export default function App() {
    const [poseData, setPoseData] = useState([]);
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const landmarkerRef = useRef(null);

    // capture de webcam stream en ontvang posedata
    const capture = async () => {
        if (webcamRef.current && landmarkerRef.current && webcamRef.current.getCanvas()) {
            const video = webcamRef.current.video;
            if (video.currentTime > 0) {
                const result = await landmarkerRef.current.detectForVideo(video, performance.now());
                if (result.landmarks) {
                    setPoseData(result.landmarks);
                }
            }
        }
        requestAnimationFrame(capture);
    };

    // laad het landmarker model in de landmarkerRef
    useEffect(() => {
        const createHandLandmarker = async () => {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
            );
            const handLandmarker = await HandLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
                    delegate: "GPU",
                },
                runningMode: "VIDEO",
                numHands: 2,
            });
            landmarkerRef.current = handLandmarker;
            console.log("handlandmarker is created!");
            capture();
        };
        createHandLandmarker();
    }, []);

    // Posedata: array van handen. Hand: array van landmarks. Landmark: object met x,y,z
    useEffect(() => {
        if (poseData.length > 0) {
            const hand = poseData[0];
            console.log(hand);
        }
    }, [poseData]);

    return (
        <>

        <section className="videosection">

            <Webcam
                width="480"
                height="270"
                mirrored
                id="webcam"
                audio={false}
                videoConstraints={videoConstraints}
                ref={webcamRef}
            />
            <canvas ref={canvasRef} width="480" height="270"></canvas>
            <div className='Coordinates'>
            <Coordinates poseData={poseData}/>
            </div>
        </section>

            <div className='Hands'>
    <Hands poseData={poseData}/>
            </div>

      <div className='Knn'>
    <Knn ></Knn>
      </div>
        </>
    );
}