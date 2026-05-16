import "./Alters.css"
import { useEffect, useRef, useState } from "react";
import {RivenPage} from "./Alters/Riven.tsx";
import AurynnPage from "./Alters/Aurynn.tsx"
import {Corin} from "./Alters/Corin.tsx";
const alters = [
    {
        name: "Riven",
        color: "#a855f7",
        path: "/riven",
        page: <RivenPage />,
    },
    {
        name: "Bryn",
        color: "#ff4141",
        path: "/Bryn",
    },
    {
        name: "Kiko",
        color: "#84ff3b",
        path: "/Kiko",
    },
    {
        name: "Zada",
        color: "#aeaeae",
        path: "/Zada",
    },
    {
        name: "Aurynn",
        color: "#ff42e5",
        path: "/Aurynn",
        page: <AurynnPage />,
    },
    {
        name: "Corin",
        color: "#f8f045",
        path: "/Corin",
        page: <Corin />
    },
];


export function AlterWheel() {
    const wheelRef =
        useRef<HTMLDivElement | null>(null);

    const lastAngleRef =
        useRef<number | null>(null);

    const [rotation, setRotation] =
        useState(0);

    const [dragging, setDragging] =
        useState(false);
    const sliceSize = 360 / alters.length;

    const gradientOffset = 360 / alters.length;

    const normalized =
        ((rotation % 360) + 360) % 360;

    const visualRotation =
        (-normalized + gradientOffset + 360) % 360;

    const selectedIndex =
        Math.floor(
            visualRotation / sliceSize
        ) % alters.length;

    const selectedAlter =
        alters[selectedIndex];
    const gradient = `
    conic-gradient(
        from ${gradientOffset + 0 * (sliceSize / 2)}deg,
        ${alters
        .map(
            (alter, index) => `
                    ${alter.color}
                    ${index * sliceSize}deg
                    ${(index + 1) * sliceSize}deg
                `
        )
        .join(",")}
    )
`;

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            if (!dragging || !wheelRef.current)
                return;

            const rect =
                wheelRef.current.getBoundingClientRect();

            const centerX =
                rect.left + rect.width / 2;

            const centerY =
                rect.top + rect.height / 2;

            const angle =
                Math.atan2(
                    e.clientY - centerY,
                    e.clientX - centerX
                ) *
                (180 / Math.PI);

            if (
                lastAngleRef.current !== null
            ) {
                let delta =
                    angle - lastAngleRef.current;

                if (delta > 180) delta -= 360;
                if (delta < -180) delta += 360;

                setRotation((prev) => prev + delta);

            }

            lastAngleRef.current = angle;
        };

        const handleUp = () => {
            setDragging(false);

            const sliceSize =
                360 / alters.length;

            setRotation((prev) => {
                return (
                    Math.round(prev / sliceSize) *
                    sliceSize
                );
            });

            lastAngleRef.current = null;
        };

        window.addEventListener(
            "mousemove",
            handleMove
        );

        window.addEventListener(
            "mouseup",
            handleUp
        );

        return () => {
            window.removeEventListener(
                "mousemove",
                handleMove
            );

            window.removeEventListener(
                "mouseup",
                handleUp
            );
        };
    }, [dragging]);
    function getAlterOpacity(index: number) {
        const normalized =
            ((rotation % 360) + 360) % 360;

        const visualRotation =
            (-normalized + gradientOffset + 360) % 360;

        const target =
            index * sliceSize;

        let diff =
            Math.abs(visualRotation - target);

        if (diff > 180) {
            diff = 360 - diff;
        }

        return Math.max(
            0,
            1 - diff / sliceSize
        );
    }
    return (
        <>
            <div className="pageStack">
                {alters.map((alter, index) => (
                    <div
                        key={alter.name}
                        className="alterPage"
                        style={{
                            opacity:
                                getAlterOpacity(index),
                        }}
                    >
                        {alter.page}
                    </div>
                ))}
            </div>
            <div
                className="wheelContainer"
            >
                <div
                    ref={wheelRef}
                    className="wheel"
                    onMouseDown={() => setDragging(true)}
                    style={{
                        transform: `rotate(${rotation}deg)`,

                        transition: dragging
                            ? "none"
                            : "transform 0.35s ease-out",

                        background: gradient,

                        boxShadow: `
            0 0 60px ${selectedAlter.color}
        `,
                    }}
                >
                    {alters.map((alter, index) => {
                        const angle =
                            gradientOffset +
                            180 +
                            index * sliceSize +
                            sliceSize / 2;

                        return (
                            <div
                                key={alter.name}
                                className="alterLabel"
                                style={{
                                    transform: `
                    rotate(${angle}deg)
                    translateY(170px)
                `,
                                }}
                            >
            <span
                style={{
                    transform: `
                        rotate(${-angle - rotation}deg)
                    `,
                }}
            >
                {alter.name}
            </span>
                            </div>
                        );
                    })}

                </div>
            </div>


        </>
    );
}





export default function Alters() {
    return (
        <div className={"mainRoot"}>
            <AlterWheel />

        </div>
    );
}