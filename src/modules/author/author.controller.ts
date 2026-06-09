import {asyncHandler} from "../../utils/asyncHandler";
import {createAuthorSchema, updateAuthorSchema} from "./author.schema";
import {AuthorService} from "./author.service";
import {idParamSchema} from "../../shared/validations/common.schema";

export const createAuthorCtrl = asyncHandler(async (req, res) => {
    const body = createAuthorSchema.parse(req.body);
    const author = await AuthorService.createAuthor(body);

    res.status(201).json({
        success: true,
        message: 'Author successfully created',
        data: author
    })
})

export const getAuthorByIdCtrl = asyncHandler(async (req, res) => {
    const param = idParamSchema.parse(req.params);
    const author = await AuthorService.findAuthorById(param);

    res.status(200).json({
        success: true,
        message: 'Author retrieved successfully',
        data: author
    })
})

export const getAllAuthorsCtrl = asyncHandler(async (req, res) => {
    const authors = await AuthorService.getAllAuthors();
    res.status(200).json({
        success: true,
        message: 'Authors retrieved successfully',
        data: authors
    })
})

export const updateAuthorCtrl = asyncHandler(async (req, res) => {
    const param = idParamSchema.parse(req.params);
    const body = updateAuthorSchema.parse(req.body);
    const author = await AuthorService.updateAuthor(param, body);
    res.status(200).json({
        success: true,
        message: 'Author successfully updated',
        data: author
    })
})

export const softDeleteAuthorCtrl = asyncHandler(async (req, res) => {
    const param = idParamSchema.parse(req.params);
    await AuthorService.softDeleteAuthor(param);
    res.status(204).send()
})

export const restoreAuthorCtrl = asyncHandler(async (req, res) => {
    const param = idParamSchema.parse(req.params);
    const author = await AuthorService.restoreAuthor(param);
    res.status(200).json({
        success: true,
        message: 'Author successfully restored',
        data: author
    })
})