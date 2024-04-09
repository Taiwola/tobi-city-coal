"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyFlwSignature = (req, res, next) => {
    // Verify the signature to ensure the request is from Flutterwave
    const secretHash = process.env.FLW_SECRET_HASH;
    const signature = req.headers["verif-hash"];
    if (!signature || signature !== secretHash) {
        // The request is not from Flutterwave; discard
        return res.status(401).end();
    }
    else {
        next();
    }
};
exports.default = verifyFlwSignature;
//# sourceMappingURL=verifyFlwSignature.js.map