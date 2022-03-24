import { Request, Response } from 'express'
import { prismaClient } from '../database/prismaClient';


class Gender {

    async create(req: Request, res: Response) {

        const { gender } = req.body

        const save = await prismaClient.gender.create({
            data: {
                name: gender
            }
        })

        return res.json(save)

    }

    async read(req: Request, res: Response) {

        const response = await prismaClient.gender.findMany({})

        return res.json(response)

    }

}

export default new Gender()