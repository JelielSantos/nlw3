import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import Orphanage from '../models/Orphanage';




export default {
    async index(request: Request, response: Response){
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations:['images']
        });

        return response.json(orphanages);
    },

    async show(request: Request, response: Response){
        const { id } = request.params;
        const orphanagesRepository = getRepository(Orphanage);
 

        const orphanage = await orphanagesRepository.findOneOrFail(id);

        return response.json(orphanage);
    },

    async create(request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            
        } = request.body;

        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = request.files as Express.Multer.File[];
        
        const images = requestImages.map(image => {
            return { path: image.filename}
        })

        const orphanages = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            
            
        });

        await orphanagesRepository.save(orphanages);

        return response.status(201).json(orphanages);
    }
}