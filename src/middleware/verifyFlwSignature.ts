import { Request, Response, NextFunction } from "express";

const verifyFlwSignature = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Verify the signature to ensure the request is from Flutterwave
  const secretHash = process.env.FLW_SECRET_HASH;
  const signature = req.headers["verif-hash"];

  if (!signature || signature !== secretHash) {
    // The request is not from Flutterwave; discard
    return res.status(401).end();
  } else {
    next();
  }
};

export default verifyFlwSignature;
