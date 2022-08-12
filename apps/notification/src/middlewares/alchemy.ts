import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { ApiError } from "../utils";
import { AlchemyValidIPs } from "../config";

export const validateAlchemyIP = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const ip =
    (req.get("x-forwarded-for") ?? "").split(",").pop()?.trim() ??
    req.socket.remoteAddress ??
    "";

  if (AlchemyValidIPs.has(ip)) {
    return next();
  } else {
    return next(
      new ApiError(httpStatus.UNAUTHORIZED, "Not a recognized IP address")
    );
  }
};
