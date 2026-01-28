import crypto from "crypto";

export function generateCSRFToken() {
    return crypto.randomBytes(32).toString("hex");
}
