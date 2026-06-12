import {asyncHandler} from "../../utils/asyncHandler";
import {createBookSchema, updateBookSchema} from "./book.schema";
import {BookService} from "./book.service";
import {idParamSchema, paginationSchema} from "../../shared/validations/common.schema";

export const createBookCtrl= asyncHandler(async (req, res)=> {
    const body = createBookSchema.parse(req.body);
    const book = await BookService.createBook(body);
    res.status(201).json({
        success: true,
        message: 'Book created successfully.',
        data: book
    });
})

export const getAllBooksCtrl = asyncHandler(async (req, res)=> {
    const query = paginationSchema.parse(req.query);
    const result = await BookService.findAllBooks(query);
    res.status(200).json({
        success: true,
        message: 'Books retrieved successfully.',
        data: result.data,
        pagination: result.pagination
    })
})

export const getBookByIdCtrl=asyncHandler(async (req, res)=> {
    const params = idParamSchema.parse(req.params);
    const result = await BookService.findBookById(params);
    res.status(200).json({
        success: true,
        message: 'Book retrieved successfully.',
        data: result,
    })
})

export const updateBookCtrl = asyncHandler(async (req, res)=> {
    const params = idParamSchema.parse(req.params);
    const body = updateBookSchema.parse(req.body);
    const result = await BookService.updateBook(params,body);

    res.status(200).json({
        success: true,
        message: 'Book updated successfully.',
        data: result,
    })
})

export const softDeleteBookCtrl = asyncHandler(async (req, res)=> {
    const params = idParamSchema.parse(req.params);
    await BookService.softDeleteBook(params);
    res.status(204).send();
})

export const restoreBookCtrl=asyncHandler(async (req, res)=> {
    const params = idParamSchema.parse(req.params);
    const result = await BookService.restoreBook(params);
    res.status(200).json({
        success: true,
        message: 'Book restored successfully.',
        data: result,
    })
})