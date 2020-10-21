import { Response, Request} from 'express';
import { getRepository } from 'typeorm';

import Orphanage from '../models/Orphanage';


export default {
    async create(response: Response, request: Request) {
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