import {PublisherRepository} from "./publisher.repository";
import {idParamInput, paginationInput, paginationSchema} from "../../shared/validations/common.schema";
import {PublisherInput, UpdatePublisherInput} from "./publisher.schema";
import {AppError} from "../../utils/app.error";

export const PublisherService ={
    async findAll(query: paginationInput) {
        const skip = (query.page-1)*query.limit;
        const [publishers, total] = await Promise.all([
            PublisherRepository.getAllPublishers(skip, query.limit),
            PublisherRepository.countPublishers(),
        ])
        return {
            data: publishers,
            pagination: {
                page: query.page,
                limit: query.limit,
                total,
                totalPages: Math.ceil(total / query.limit),
            }
        }
    },
    async ensurePublisherExists(id: string) {
        const publisher =
            await PublisherRepository.findPublisherById(id);

        if (!publisher) {
            throw new AppError('Publisher not found!', 404);
        }

        return publisher;
    },

    async findById(params: idParamInput) {
        const publisher = await PublisherRepository.findPublisherById(params.id);
        if (!publisher) {
            throw new AppError('Publish not found!', 404);
        }

        return publisher;
    },

    async createPublisher(data: PublisherInput) {
        const existingName = await PublisherRepository.findPublisherByName(data.name);
        if(existingName) {
            throw new AppError('Name already exists!', 409);
        }
        if (data.email) {
            const existingEmail =
                await PublisherRepository.findPublisherByEmail(data.email);

            if (existingEmail) {
                throw new AppError('Email already exists!', 409);
            }
        }
        return PublisherRepository.createPublisher(data);
    },
    async updatePublisher(publisherId:idParamInput,data: UpdatePublisherInput) {
        const existPublisher = await this.ensurePublisherExists(publisherId.id)
        if(!existPublisher) {
            throw new AppError('Publisher not found!', 404);
        }
        if(data.name) {
            const existingName = await PublisherRepository.findPublisherByName(data.name);
            if(existingName && existingName.id !==publisherId.id ) {
                throw new AppError('Name already exists!', 409);
            }
        }
        if(data.email) {
            const existingEmail = await PublisherRepository.findPublisherByEmail(data.email);
            if(existingEmail && existingEmail.id !==publisherId.id ) {
                throw new AppError('Email already exists!', 409);
            }
        }


        return PublisherRepository.updatePublisher(publisherId, data);
    },

    async deletePublisher(publisherId:idParamInput) {
        const publisher = await PublisherRepository.findPublisherById(publisherId.id);
        if(!publisher) {
            throw new AppError('Publisher not found!', 404);
        }

        return PublisherRepository.deletePublisher(publisherId);
    }


}