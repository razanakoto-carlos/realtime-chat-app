import type { AnyAaaaRecord } from "dns";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user: any;
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const headers = req.cookies.authToken;

    if (!headers) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(headers, process.env.JWT_SECRET as string);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
