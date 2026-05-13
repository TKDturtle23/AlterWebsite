import "./Information.css"
import {useState} from "react";

function Information() {
    return (
        <div className={"mainRoot"}>
            <div className={"Header"}>
                <div className={"Content"}>
                    <h1>Information</h1>
                </div>
            </div>
            <div className={"InformationGrid"}>
                <div className={"Information_Content"}>
                    <h3>Intro</h3>
                    <p>
                        Salutations, this is just a lot of general info about us. I wanted to add this when I saw
                        vespers, so… yeah. This is Riven writing this.
                        The whole system name is currently ‘Loyal’, though that is subject to change as I would like to
                        find a better one.
                    </p>
                </div>

                <div className={"Information_Content"}>
                    <h3>Fronting</h3>
                    <p>
                        (This next part will be written in 3rd person)
                        So, fronting wise, Riven is generally the one that fronts the most. This is thought to be due to
                        their mother, as they are the best with handling them.
                        The reason for this is not fully understood. There are also periods where another alter will
                        front for multiple days at a time.
                        This is usually triggered by either an activity they like, or high stress. Examples include Bryn
                        and Scouts, or when the system was first discovered and multiple panic attacks occurred.
                    </p>
                </div>

                <div className={"Information_Content"}>
                    <h3>Memory</h3>
                    <p>
                        While in general there are significant memory issues, no occurrence has been found of an alter
                        knowing a memory that others do not.
                        This shows up predominantly as difficulty remembering names and tasks.
                    </p>
                </div>

                <div className={"Information_Content"}>
                    <h3>Stressors</h3>
                    <p>
                        Each alter has different stress responses.
                    </p>

                    <ul>
                        <li>Parents not believing us — affects everyone</li>
                        <li>Toxic masculinity — does not affect being</li>
                        <li>Surgeries while awake — affects Riven, likely affects others</li>
                        <li>Overstimulation — varies between alters</li>
                    </ul>

                    <p>
                        There are likely more, but they are not currently remembered and will be added later.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Information;