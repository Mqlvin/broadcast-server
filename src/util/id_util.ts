import { randomBytes } from "crypto";

export function makeRandomId(length: number): string {
    return randomBytes(Math.floor(length / 2)).toString("hex");
}