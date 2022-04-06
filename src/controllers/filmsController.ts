import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

class Films {
  async create(req: Request, res: Response) {
    const { name, sinopse, genderId, url } = req.body;
    const { userId } = req.params

    const itemExits = await prismaClient.films.findFirst({ where: { name: name } })
    const userExists = await prismaClient.user.findFirst({ where: { id: userId } })

    if (itemExits) {
      return res.sendStatus(409)
    }

    if (!userExists) {
      return res.sendStatus(404)
    }

    const save = await prismaClient.films.create({
      data: {
        name,
        sinopse,
        url,
        userId,
        genderId
      }
    })
    return res.json(save);
  }

  async read(req: Request, res: Response) {

    const films = await prismaClient.films.findMany({ include: {
      Gender: true
    } })

    return res.json(films);

  }

  async readOne(req: Request, res: Response){

    const { filmId } = req.params

    const id = parseInt(filmId)

    const find = await prismaClient.films.findFirst({
      where: { id: id },
      include:{ 
        Gender: true
      }
    })

    delete find.userId
    delete find.Gender.id

    return res.json(find)

  }

  async update(req: Request, res: Response) {

    const { name, sinopse } = req.body;
    const { filmId } = req.params

    const itemExits = await prismaClient.films.findFirst({ where: { name: name } })

    if (!itemExits) {
      return res.sendStatus(404)
    }

    const id = parseInt(filmId)

    const updated = await prismaClient.films.update({
      where: {
        id: id
      },
      data: {
        name,
        sinopse
      }
    })

    return res.json({ updated });
  }


  async delete(req: Request, res: Response) {

    const { filmId } = req.params;

    const id = parseInt(filmId)

    const filmExits = await prismaClient.films.findFirst({ where: { id: id } })

    if (!filmExits) {
      return res.sendStatus(404)
    }

    await prismaClient.films.delete({ where: { id: id } })

    return res.send("Deletado com sucesso");
  }


}
export default new Films();