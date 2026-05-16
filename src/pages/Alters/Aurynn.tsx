import "./Aurynn.css";
import {FivePebblesArm} from "./FivePebbles.tsx";

import Pearl from "./Assets/Pearl_SU_filt.png"
import Grid from "./Assets/abstract-horizontal-grid-lines-graph-style-graphic-design_1017-39918.avif"
export default function AurynnPage() {
    return (
        <div className="Aurynn">
            <FivePebblesArm />
            <img className="AurynnGrid" src={Grid} alt="Grid" />

            <div className="AurynnBackground">
                <div className="AurynnTitle">
                    <div className="AurynnTitleText">
                        <div className={"AurynnTitleBar"}></div>
                        <img src={Pearl} alt={"Pearl"}/>
                        <h1>Aurynn</h1>
                        <img src={Pearl} alt={"Pearl"}/>
                        <div className={"AurynnTitleBar"}></div>
                    </div>
                    <p>It/Its</p>
                </div>

                <div className="AurynnGrids">
                    <div className={"AurynnGridEntry"}>
                        <h1>Bitch, I'm not filling this out for you</h1>
                        <p>ya</p>
                    </div>

                </div>

            </div>
        </div>
    );
}