import { Request, Response } from "express";
import { prisma } from "../database";

import { hash, hashSync } from "bcrypt";

class User {
  async create(req: Request, res: Response) {
    const { name, email, pwd, username } = req.body;

    const userExists = await prisma.user.findFirst({ where: { email } });

    if (userExists) {
      res.send({ msg: "user already exists!" }).status(409).end();
    }

    const password = await hash(pwd, 8);

    await prisma.user.create({
      data: {
        name,
        email,
        password,
        username,
      },
    });

    res.send({ msg: "User Saved!" }).status(201).end();
  }
}

export default new User();
