import "./Aurynn.css";
import {FivePebblesArm} from "./FivePebbles.tsx";

import Pearl from "./Assets/Pearl_SU_filt.png"

export default function AurynnPage() {
    return (
        <div className="Aurynn">
            <FivePebblesArm />
            <div className="AurynnBackground">
                <div className="AurynnTitle">
                    <img src={Pearl} alt={"Pearl"}/>
                    <h1>Aurynn</h1>
                    <img src={Pearl} alt={"Pearl"}/>
                </div>

            </div>
        </div>
    );
}