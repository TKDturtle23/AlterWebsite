// FABRIK.ts

export interface Vector2 {
    x: number;
    y: number;
}

export interface Joint {
    location: Vector2;
}

export class FABRIK {
    joints: Joint[];
    distances: number[];

    constructor(joints: Joint[], distances: number[]) {
        this.joints = joints;
        this.distances = distances;
    }

    private dist(a: Vector2, b: Vector2) {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        return Math.sqrt(dx * dx + dy * dy);
    }



    isReachable(target: Vector2): boolean {
        const base = this.joints[0].location;
        const d = this.dist(base, target);
        const total = this.distances.reduce((a, b) => a + b, 0);
        return d <= total;
    }

    solve(target: Vector2, maxIter = 10, tolerance = 0.5) {
        const joints = this.joints.map(j => ({
            location: { ...j.location }
        }));

        const base = { ...joints[0].location };

        if (!this.isReachable(target)) {
            for (let i = 0; i < joints.length - 1; i++) {
                const r = this.dist(joints[i].location, target);
                const k = this.distances[i] / r;

                joints[i + 1].location = {
                    x: joints[i].location.x * (1 - k) + target.x * k,
                    y: joints[i].location.y * (1 - k) + target.y * k,
                };
            }

            this.joints = joints;
            return joints;
        }

        let diff = this.dist(joints[joints.length - 1].location, target);
        let iter = 0;

        while (diff > tolerance && iter < maxIter) {

            // forward
            joints[joints.length - 1].location = { ...target };

            for (let i = joints.length - 2; i >= 0; i--) {
                const r = this.dist(joints[i].location, joints[i + 1].location);
                const k = this.distances[i] / r;

                joints[i].location = {
                    x: joints[i + 1].location.x * (1 - k) + joints[i].location.x * k,
                    y: joints[i + 1].location.y * (1 - k) + joints[i].location.y * k,
                };
            }

            // backward
            joints[0].location = base;

            for (let i = 0; i < joints.length - 1; i++) {
                const r = this.dist(joints[i].location, joints[i + 1].location);
                const k = this.distances[i] / r;

                joints[i + 1].location = {
                    x: joints[i].location.x * (1 - k) + joints[i + 1].location.x * k,
                    y: joints[i].location.y * (1 - k) + joints[i + 1].location.y * k,
                };
            }

            diff = this.dist(joints[joints.length - 1].location, target);
            iter++;
        }

        this.joints = joints;
        return joints;
    }
}