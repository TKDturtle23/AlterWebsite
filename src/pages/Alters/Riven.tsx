import "./Riven.css"
import { useEffect, useRef } from "react";




export function BoidsBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const mouse = useRef({ x: 0, y: 0, active: false });

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        let w = window.innerWidth;
        let h = window.innerHeight;

        const BOID_COUNT = 600;

        const MAX_SPEED = 2.2;
        const NEIGHBOR_DIST = 60;
        const DESIRED_SEPARATION = 20;

        const ALIGN_WEIGHT = 0.04;
        const COHESION_WEIGHT = 0.002;
        const SEPARATION_WEIGHT = 0.10;
        const MOUSE_WEIGHT = 0.00;

        const boids = Array.from({ length: BOID_COUNT }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
        }));

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;

            w = window.innerWidth;
            h = window.innerHeight;

            canvas.width = w * dpr;
            canvas.height = h * dpr;

            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        window.addEventListener("resize", resize);
        resize();

        const limitSpeed = (b: any) => {
            const speed = Math.hypot(b.vx, b.vy);
            if (speed > MAX_SPEED) {
                b.vx = (b.vx / speed) * MAX_SPEED;
                b.vy = (b.vy / speed) * MAX_SPEED;
            }
        };

        const step = () => {
            ctx.fillStyle = "rgba(0,0,0,0.25)";
            ctx.fillRect(0, 0, w, h);

            for (let i = 0; i < boids.length; i++) {
                const b = boids[i];

                let ax = 0;
                let ay = 0;

                let avgVx = 0;
                let avgVy = 0;

                let centerX = 0;
                let centerY = 0;

                let count = 0;

                for (let j = 0; j < boids.length; j++) {
                    if (i === j) continue;

                    const other = boids[j];

                    const dx = b.x - other.x;
                    const dy = b.y - other.y;

                    const dist = Math.hypot(dx, dy);

                    if (dist < NEIGHBOR_DIST) {
                        avgVx += other.vx;
                        avgVy += other.vy;

                        centerX += other.x;
                        centerY += other.y;

                        count++;

                        if (dist < DESIRED_SEPARATION) {
                            ax += dx;
                            ay += dy;
                        }
                    }
                }

                if (count > 0) {
                    avgVx /= count;
                    avgVy /= count;

                    b.vx += (avgVx - b.vx) * ALIGN_WEIGHT;
                    b.vy += (avgVy - b.vy) * ALIGN_WEIGHT;

                    centerX /= count;
                    centerY /= count;

                    b.vx += (centerX - b.x) * COHESION_WEIGHT;
                    b.vy += (centerY - b.y) * COHESION_WEIGHT;
                }

                b.vx += ax * SEPARATION_WEIGHT;
                b.vy += ay * SEPARATION_WEIGHT;

                if (mouse.current.active) {
                    const dx = b.x - mouse.current.x;
                    const dy = b.y - mouse.current.y;
                    const dist = Math.hypot(dx, dy) || 1;

                    const force = MOUSE_WEIGHT / dist;

                    b.vx += dx * force;
                    b.vy += dy * force;
                }

                limitSpeed(b);

                b.x += b.vx;
                b.y += b.vy;

                // bounce boundaries
                if (b.x < 0) {
                    b.x = 0;
                    b.vx *= -1;
                }
                if (b.x > w) {
                    b.x = w;
                    b.vx *= -1;
                }

                if (b.y < 0) {
                    b.y = 0;
                    b.vy *= -1;
                }
                if (b.y > h) {
                    b.y = h;
                    b.vy *= -1;
                }

                ctx.fillStyle = "white";
                ctx.fillRect(b.x, b.y, 2, 2);
            }

            requestAnimationFrame(step);
        };

        step();

        const onMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
            mouse.current.active = true;
        };

        const onLeave = () => {
            mouse.current.active = false;
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseleave", onLeave);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "black",
            }}
        />
    );
}
export function RivenPage() {
    const entries = [
        {
            title: "Likes",
            items: [
                "Programming",
                "Video games",
                "Building things",
                "Sprite",
                "Cuddling",
                "Sleeping"
            ]
        },
        {
            title: "Dislikes",
            items: [
                "Procedures while awake",
                "Loud noises",
                "Sudden changes in plan"
            ]
        },
        {
            title: "Stressors",
            items: [
                "Surgery with Local Anesthesia",
                "Loud noises",
                "Yelling",
                "Sudden changes in plan"
            ]
        },
        {
            title: "Tells",
            items: [
                "Small vocal noises",
                "Curse a little, not as much as bryn",
                "Sprite",
                "Bottom"
            ]
        },
        {
            title: "Guessed reason for existing",
            items: [
                "Working with mom"
            ]
        }
    ];

    return (
        <div className="Rivenpage">
            <BoidsBackground />

            <div className="RivenBackground">
                <div className="Riven_Header">
                    <div className="RivenHeader_title">
                        <div className="Riven_Circle" />
                        <h1>Riven</h1>
                        <div className="Riven_Circle" />
                    </div>
                    <p>They/She/It</p>
                </div>

                <div className="Riven_Grid">
                    {entries.map((entry, i) => (
                        <div
                            key={entry.title}
                            className="Riven_Grid_entry"
                            style={{ animationDelay: `${i * 120}ms` }}
                        >
                            <h3>{entry.title}</h3>
                            <ul>
                                {entry.items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}