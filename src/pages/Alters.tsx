import "./Alters.css"
import { useState } from "react";
type Detail = {
    title: string;
    value: string[];
};
type AlterProps = {
    name: string;
    pronouns: string;
    color: string;
    details: Detail[];
}

function Alter({name, details, pronouns, color}: AlterProps) {
    const [open, setOpen] = useState(false);


    return (
        <div className="Alter">
            <div className={"CollapsingBar"} onClick={() => setOpen(!open)}>
                <h1>{name}</h1>
            </div>
            <div className={`ContentWrapper ${open ? "open" : ""}`}>
                <div style={{paddingLeft: "2%"}}>
                    <div className="LeftColorBar" style={{borderLeft: `8px solid ${color}`}}>

                        <p> - {pronouns}</p>
                        <div className="Details">
                            {details.map((detail, index) => (
                                <div className="DetailRow" key={index}>
                                    <b className="DetailTitle">
                                        {detail.title}
                                    </b>


                                        <ul className="DetailValue">
                                            {detail.value.map((value, index) => (
                                                <li key={index}>{value}</li>
                                            ))}
                                        </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}
const ALTERS: AlterProps[] = [
    {
        name: "Riven",
        pronouns: "They/She/It",
        color: "#8915a1",
        details: [
            { title: "Details", value: ["Bottom", "likes Sprite"] },
            { title: "Stress", value: ["squirms", "if overflowed, it's the average autistic meltdown"] },
            {
                title: "Tells",
                value: [
                    "Makes small vocal noises a lot.",
                    "I am what we call in the biz, basic as fuck.",
                    "I curse a little, but not as much as bryn."
                ]
            },
            { title: "Good At", value: ["dealing with mom", "programming."] }
        ]
    },
    {
        name: "Bryn",
        pronouns: "They/Them",
        color: "#AA2222",
        details: [
            { title: "Details", value: ["Scout"] },
            { title: "Stress", value: ["Pretty sure snaps back if yelled at constantly", "decent at handling stress"] },
            { title: "Tells", value: ["Curses a lot", "Tends to act a bit more masculine", "Likes scouts"] },
            { title: "Good At", value: ["Leadership"] }
        ]
    },
    {
        name: "Kiko",
        pronouns: "they/anything funny",
        color: "#49e972",
        details: [
            { title: "Details", value: ["Hyper", "laughs a lot"] },
            { title: "Stress", value: ["Stops fronting"] },
            { title: "Tells", value: ["Very energetic, almost manic", "talks fast / constantly active"] },
            { title: "Good At", value: ["getting us to eat", "entertaining us"] }
        ]
    },
    {
        name: "Zada",
        pronouns: "They/Them",
        color: "#b2b2b2",
        details: [
            { title: "Details", value: ["Introverted", "talks less than Riven"] },
            { title: "Stress", value: ["unknown / not seen recently"] },
            { title: "Tells", value: ["quiet", "doesn't react to teasing"] },
            { title: "Good At", value: ["reading", "homework"] }
        ]
    },
    {
        name: "Aurynn",
        pronouns: "it/its",
        color: "#f95bd1",
        details: [
            { title: "Details", value: ["unclear / hard to define", "different 'flavor' of us"] },
            { title: "Stress", value: ["unknown"] },
            { title: "Tells", value: ["wiggles their butt", "little reaction to teasing", "subtle presence"] },
            { title: "Good At", value: ["unclear / not well defined"] }
        ]
    },
    {
        name: "Corin",
        pronouns: "They/She",
        color: "#d9ee40",
        details: [
            { title: "Details", value: ["likes hot chocolate", "likes jazz"] },
            { title: "Stress", value: ["unknown"] },
            { title: "Tells", value: ["jazz association", "doesn't react to teasing"] },
            { title: "Good At", value: ["unknown / not specified"] }
        ]
    }
];

export default function Alters() {
    return (
        <div className={"mainRoot"}>
            <div className={"Header"}>
                <div className={"Content"}>
                    <h1>Alters</h1>
                </div>

            </div>
            <div className="Alters">
                {ALTERS.map(alter => (
                    <Alter key={alter.name} {...alter} />
                ))}
            </div>
        </div>
    );
}