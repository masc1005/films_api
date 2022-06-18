import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { prisma } from "../database";

class AuthController {
  async Index(req: Request, res: Response, next: NextFunction) {
    return res.send({ userId: req.userId });
  }

  async Authenticate(req: Request, res: Response) {
    const { email, pwd } = req.body;

    const userAuth = await prisma.user.findFirst({ where: { email } });

    if (!userAuth) {
      return res.send({ msg: "User not found!" }).status(404).end();
    }

    const isValid = await bcrypt.compare(pwd, userAuth.password);

    if (!isValid) {
      res.send({ msg: "Invalid Password" }).status(401).end();
    }

    const token = jwt.sign({ id: userAuth.id }, process.env.AUTH_SECRET, {
      expiresIn: "1d",
    });

    delete userAuth.password

    return res.json({
      userAuth,
      token,
    });
  }
}

export default new AuthController();
