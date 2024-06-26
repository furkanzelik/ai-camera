import { useEffect, useRef, useState } from "react";
import { DrawingUtils } from "@mediapipe/tasks-vision";
import '../Hands.css';

function Hands({ poseData }) {
    const canvasRef = useRef(null);
    const drawingUtilsRef = useRef(null);
    const [drawingUtils, setDrawingUtils] = useState({});

    useEffect(() => {
        if (canvasRef.current && !drawingUtils.ctx) {
            const ctx = canvasRef.current.getContext("2d");
            setDrawingUtils((prevState) => ({
                ...prevState,
                ctx,
            }));
        }
    }, []);

    useEffect(() => {
        if (drawingUtils.ctx) {
            drawingUtilsRef.current = new DrawingUtils(drawingUtils.ctx);
        }
    }, [drawingUtils.ctx]);

    useEffect(() => {
        if (poseData.length > 0 && drawingUtilsRef.current) {
            const ctx = canvasRef.current.getContext("2d");

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            // eslint-disable-next-line react/prop-types
            poseData.forEach((hand) => {
                drawingUtilsRef.current.drawConnectors(hand, DrawingUtils.HAND_CONNECTIONS, {
                    color: "#AAFF00",
                });
                drawingUtilsRef.current.drawLandmarks(hand, {
                    radius:4 , color:'#FF0000' , lineWidth:2
                })
            });
        }
    }, [poseData, drawingUtilsRef.current]);

    return (
        <canvas className="overlap" ref={canvasRef} width="480" height="270"></canvas>
    );
}

export default Hands;