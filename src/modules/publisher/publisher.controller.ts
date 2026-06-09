import {publisherSchema, updatePublisherSchema} from "./publisher.schema";
import {PublisherService} from "./publisher.service";
import {idParamSchema, paginationSchema} from "../../shared/validations/common.schema";
import {asyncHandler} from "../../utils/asyncHandler";

export const createPublisherCtrl = asyncHandler(async (req,res) => {
    const body = publisherSchema.parse(req.body);
    const publisher = await PublisherService.createPublisher(body);
    res.status(201).json({
        success: true,
        message: 'Publisher created successfully',
        publisher,
    })
})

export const getAllPublishersCtrl = asyncHandler(async (req,res) => {
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
})

export const getPublisherByIdCtrl = asyncHandler(async (req,res) => {
    const params = idParamSchema.parse(req.params);
    const result = await PublisherService.findById(params);
    res.status(200).json({
        success: true,
        message: 'Publisher retrieved successfully',
        result,
    })
})

export const updatePublisherCtrl = asyncHandler(async (req,res) => {
    const params = idParamSchema.parse(req.params);
    const body = updatePublisherSchema.parse(req.body);

    const result = await PublisherService.updatePublisher(params, body);

    res.status(200).json({
        success: true,
        message: 'Publisher updated successfully',
        result,
    })
})

export const deletePublisherCtrl = asyncHandler(async (req,res) => {
    const params = idParamSchema.parse(req.params);
    await PublisherService.deletePublisher(params);

    res.status(204).send();
})