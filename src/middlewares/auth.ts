import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface tokenData {
  name: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(201);
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, process.env.AUTH_SECRET);

    const { name } = data as tokenData;

    req.userName = name;

    return next();
  } catch (error) {
    return console.log(error);
  }
}
