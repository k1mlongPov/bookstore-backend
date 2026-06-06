import {Request,Response,NextFunction} from "express";
import {publisherSchema, updatePublisherSchema} from "./publisher.schema";
import {PublisherService} from "./publisher.service";
import {idParamSchema, paginationSchema} from "../../shared/validations/common.schema";

export const createPublisherCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const body = publisherSchema.parse(req.body);
        const publisher = await PublisherService.createPublisher(body);
        res.status(201).json({
            success: true,
            message: 'Publisher created successfully',
            publisher,
        })
    }catch (e) {
        next(e);
    }
}

export const getAllPublishersCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const query = paginationSchema.parse(req.query);

        const result = await PublisherService.findAll({
            page: query.page,
            limit: query.limit,
        });

        res.status(200).json({
            success: true,
            message: 'Publishers retrieved successfully',
            publishers: result.data,
            pagination: result.pagination,
        })
    }catch (e) {
        next(e);
    }
}

export const getPublisherByIdCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const params = idParamSchema.parse(req.params);
        const result = await PublisherService.findById(params);
        res.status(200).json({
            success: true,
            message: 'Publisher retrieved successfully',
            result,
        })
    }catch (e) {
        next(e);
    }
}

export const updatePublisherCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const params = idParamSchema.parse(req.params);
        const body = updatePublisherSchema.parse(req.body);

        const result = await PublisherService.updatePublisher(params, body);

        res.status(200).json({
            success: true,
            message: 'Publisher updated successfully',
            result,
        })
    }catch (e) {
        next(e);
    }
}

export const deletePublisherCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const params = idParamSchema.parse(req.params);
        await PublisherService.deletePublisher(params);

        res.status(204).send();
    }catch (e) {
        next(e);
    }
}