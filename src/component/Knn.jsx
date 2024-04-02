import { useState, useEffect, useRef, useCallback } from 'react'
import knn from 'knear'

 function Knn(props) {
    const [prediction, setPrediction] = useState(undefined)
    const machine = useRef(new knn.kNear(3)) // of new kNear(3)

    const makePrediction = () => {
        const result = machine.current.classify(props.postDataArray.map(landmark => [landmark.x, landmark.y]).flat())
        setPrediction(result)
    }

    useEffect(() => {
        machine.current.learn([1, 2, 3], 'cat')
        machine.current.learn([0, 0, 0], 'cat')
        machine.current.learn([14, 10, 9], 'dog')
        machine.current.learn([9, 12, 13], 'dog')
    }, [])

    return (
        <>
            <button onClick={makePrediction}>Make Prediction</button>
            <p>The prediction is {prediction}</p>
        </>
    )
}

export default Knn;