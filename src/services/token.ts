import jwt from "jsonwebtoken";
import { ACCESS_SECRET, ERROR_MESSAGE } from "../utils/constants";
import User from "../models/User";
import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

export const createAccessToken = (email: string) => {
  const createdAt = Math.floor(Date.now() / 1000) - 30; //create time
  const lifeTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; //three hours in seconds

  const token = jwt.sign(
    { email, iat: createdAt, exp: lifeTime },
    ACCESS_SECRET
  );

  return token;
};

export const verifyToken = <T>(
  token: string,
  secret: string
): Promise<{ isSuccess: boolean; error?: any; decoded?: any }> => {
  return new Promise((res) => {
    jwt.verify(token, secret, async (err: any, decoded: any) => {
      if (err) {
        res({ isSuccess: false, error: err });
      } else {
        res({ isSuccess: true, decoded });
      }
    });
  });
};

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  const accessToken: string = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(StatusCodes.BAD_REQUEST).send(ERROR_MESSAGE);
  }

  const { isSuccess, error, decoded } = await verifyToken(
    accessToken,
    ACCESS_SECRET
  );

  if (!isSuccess) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }

  const user = await User.findOne({ email: decoded.email });

  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).send(ERROR_MESSAGE);
  }

  next();
};
