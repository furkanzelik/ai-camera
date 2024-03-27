import React from "react";


function Coordinates(pose) {
    return (
        <section>
            <h1>Handen</h1>
            <div>
                {pose.poseData.map((hand, i) => (
                    <div key={i}>
                        <h2>Hand {i + 1}</h2>
                        <ul>
                            {hand.map((landmark, j) => (
                                <li key={j}>
                                    {landmark.x}, {landmark.y}, {landmark.z}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}

   export default Coordinates