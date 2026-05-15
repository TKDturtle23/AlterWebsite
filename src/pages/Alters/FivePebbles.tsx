import { FABRIK, type Joint, type Vector2 } from "./FABRIK";
import { useEffect, useMemo, useRef, useState } from "react";
import arm1 from "./Assets/Five_Pebbles_Arm_1.png";
import arm2 from "./Assets/Five_Pebbles_Arm_2.png";
import arm3 from "./Assets/Five_Pebbles_Arm_3.png";
import arm4 from "./Assets/Five_Pebbles_Arm_4.png";
import arm5 from "./Assets/Five_Pebbles_Arm_5.png";
import arm6 from "./Assets/Five_Pebbles_Arm_6.png";

import eyes from "./Assets/Five_Pebbles_Eyes.png";
import body from "./Assets/Five_Pebbles_Body.png";

const SEGMENTS = [
    { length: 150, img: arm1 },
    { length: 80, img: arm2 },
    { length: 80, img: arm3 },
    { length: 40, img: arm4 },
    { length: 40, img: arm5 },
    { length: 40, img: arm6 },
];

type Particle = {
    pos: Vector2;
    prev: Vector2;
};

type Cable = {
    particles: Particle[];
    segmentLen: number;
    color: string;
    startOffset: Vector2;
    endOffset: Vector2;
};

export function FivePebblesArm() {
    const raf = useRef<number>(0);

    // ---------------- ARM (FABRIK) ----------------
    const fabrik = useMemo(() => {
        const joints: Joint[] = [];

        let x = 0;
        const y = 0;

        joints.push({ location: { x, y } });

        for (const seg of SEGMENTS) {
            x += seg.length;
            joints.push({ location: { x, y } });
        }

        return new FABRIK(joints, SEGMENTS.map(s => s.length));
    }, []);

    const endRef = useRef<Vector2>({ x: 0, y: 0 });

    // ---------------- BODY ----------------
    const bodyPos = useRef<Vector2>({ x: 300, y: 200 });
    const bodyVel = useRef<Vector2>({ x: 0, y: 0 });

    const target = useRef<Vector2>({ x: 300, y: 200 });
    const smoothed = useRef<Vector2>({ x: 300, y: 200 });

    const [bodyRender, setBodyRender] = useState(bodyPos.current);
    const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

    // ---------------- CABLES ----------------
    const cablesRef = useRef<Cable[]>([]);

    useEffect(() => {
        const cableCount = 6;

        cablesRef.current = Array.from({ length: cableCount }, (_, i) => {
            const segments = 40 + Math.floor((Math.random() - 0.5) * 12);
            const segmentLen = 6;

            const particles: Particle[] = Array.from({ length: segments }, (_, j) => ({
                pos: { x: 0, y: j * segmentLen },
                prev: { x: 0, y: j * segmentLen },
            }));

            return {
                particles,
                segmentLen,
                color: ["#d13535", "#384fec", "#d80c0c", "#444fca"][i % 4],
                startOffset: { x: -6, y: -10 },
                endOffset: { x: 8, y: -25 },
            };
        });
    }, []);

    // ---------------- EYES ----------------
    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            const end = endRef.current;

            let x = (e.clientX - end.x) * 0.01;
            let y = (e.clientY - end.y) * 0.01;

            const len = Math.hypot(x, y);
            const max = 3;

            if (len > max) {
                const s = max / len;
                x *= s;
                y *= s;
            }

            setEyeOffset({ x, y });
        };

        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    // ---------------- MAIN LOOP ----------------
    useEffect(() => {
        const interval = setInterval(() => {
            target.current = {
                x: 200 + Math.random() * 160,
                y: 100 + Math.random() * 140,
            };
        }, 3600);

        const loop = () => {
            // ARM target smoothing
            smoothed.current.x += (target.current.x - smoothed.current.x) * 0.04;
            smoothed.current.y += (target.current.y - smoothed.current.y) * 0.04;

            const solved = fabrik.solve(smoothed.current);
            fabrik.joints = solved;

            endRef.current = solved[solved.length - 1].location;

            // BODY physics
            const dx = endRef.current.x - bodyPos.current.x;
            const dy = endRef.current.y - bodyPos.current.y;

            bodyVel.current.x = (bodyVel.current.x + dx * 0.08) * 0.82;
            bodyVel.current.y = (bodyVel.current.y + dy * 0.08) * 0.82;

            bodyPos.current.x += bodyVel.current.x;
            bodyPos.current.y += bodyVel.current.y;

            // CABLES
            const base = bodyPos.current;

            for (const cable of cablesRef.current) {
                const pts = cable.particles;

                const a = {
                    x: base.x + cable.startOffset.x,
                    y: base.y + cable.startOffset.y,
                };

                const b = {
                    x: base.x + cable.endOffset.x,
                    y: base.y + cable.endOffset.y,
                };

                pts[0].pos = a;
                pts[pts.length - 1].pos = b;

                for (const p of pts) {
                    const vx = (p.pos.x - p.prev.x) * 0.98;
                    const vy = (p.pos.y - p.prev.y) * 0.98;

                    p.prev = { ...p.pos };
                    p.pos.x += vx;
                    p.pos.y += vy + 0.4;
                }

                for (let k = 0; k < 6; k++) {
                    for (let i = 0; i < pts.length - 1; i++) {
                        const p1 = pts[i];
                        const p2 = pts[i + 1];

                        const dx = p2.pos.x - p1.pos.x;
                        const dy = p2.pos.y - p1.pos.y;

                        const d = Math.hypot(dx, dy) || 1;
                        const diff = (d - cable.segmentLen) / d;

                        p1.pos.x += dx * 0.5 * diff;
                        p1.pos.y += dy * 0.5 * diff;
                        p2.pos.x -= dx * 0.5 * diff;
                        p2.pos.y -= dy * 0.5 * diff;
                    }
                }
            }

            setBodyRender({ ...bodyPos.current });

            raf.current = requestAnimationFrame(loop);
        };

        loop();

        return () => {
            clearInterval(interval);
            cancelAnimationFrame(raf.current);
        };
    }, [fabrik]);

    const joints = fabrik.joints;

    // ---------------- RENDER ----------------
    return (
        <div className="fp-arm">
            {/* ARM */}
            {joints.slice(0, -1).map((j, i) => {
                const n = joints[i + 1];

                const dx = n.location.x - j.location.x;
                const dy = n.location.y - j.location.y;

                const dist = Math.hypot(dx, dy);
                const rot = Math.atan2(dy, dx);

                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            left: j.location.x,
                            top: j.location.y,
                            width: dist,
                            height: 12,
                            backgroundColor: "#8a8a8a",
                            borderRadius: 6,
                            transform: `rotate(${rot}rad)`,
                            transformOrigin: "0% 50%",
                            pointerEvents: "none",
                        }}
                    />
                );
            })}

            {/* CABLES */}
            {cablesRef.current.map((cable, ci) =>
                cable.particles.slice(0, -1).map((p, i) => {
                    const n = cable.particles[i + 1];

                    const dx = n.pos.x - p.pos.x;
                    const dy = n.pos.y - p.pos.y;

                    const dist = Math.hypot(dx, dy);
                    const rot = Math.atan2(dy, dx);

                    return (
                        <div
                            key={`${ci}-${i}`}
                            style={{
                                position: "absolute",
                                left: p.pos.x,
                                top: p.pos.y,
                                width: dist,
                                height: 3,
                                background: cable.color,
                                transform: `rotate(${rot}rad)`,
                                transformOrigin: "0% 50%",
                                borderRadius: 4,
                                pointerEvents: "none",
                                opacity: 0.8,
                            }}
                        />
                    );
                })
            )}

            {/* BODY */}
            <img
                src={body} alt={"Body"}
                style={{
                    position: "absolute",
                    left: bodyRender.x,
                    top: bodyRender.y,
                    transform: "translate(-50%, -80%)",
                    pointerEvents: "none",
                }}
            />

            {/* EYES */}
            <img
                src={eyes} alt={"Eye"}
                style={{
                    position: "absolute",
                    left: bodyRender.x,
                    top: bodyRender.y,
                    transform: `
                        translate(-50%, -100%)
                        translate(-1px, -35px)
                        translate(${eyeOffset.x}px, ${eyeOffset.y}px)
                    `,
                    pointerEvents: "none",
                }}
            />
        </div>
    );
}
