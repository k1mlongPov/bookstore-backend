import {CreateBookInput, UpdateBookInput} from "./book.schema";
import {BookRepository} from "./book.repository";
import {AppError} from "../../utils/app.error";
import {idParamInput, paginationInput} from "../../shared/validations/common.schema";
import {CategoryRepository} from "../category/category.repository";
import {PublisherRepository} from "../publisher/publisher.repository";
import {AuthorRepository} from "../author/author.repository";

export const BookService = {
    async createBook(data: CreateBookInput) {
        const existingISBN = await BookRepository.findBookByISBN(data.isbn);
        if (existingISBN) {
            throw new AppError('ISBN already exists.', 409);
        }
        if (data.barcode) {
            const existingBarcode = await BookRepository.findBookByBarcode(data.barcode);
            if (existingBarcode) {
                throw new AppError('Barcode already exists.', 409);
            }
        }
        if (data.categoryId) {
            const category = await CategoryRepository.findCategoryById({
                id: data.categoryId
            });

            if (!category) {
                throw new AppError("Category not found.", 404);
            }
        }
        if(data.publisherId) {
            const publisher = await PublisherRepository.findPublisherById(data.publisherId);
            if (!publisher) {
                throw new AppError("Publisher not found.", 404);
            }
        }
        if (data.authorIds?.length) {
            const authors = await AuthorRepository.findAuthorsByIds(data.authorIds);

            if (authors.length !== data.authorIds.length) {
                throw new AppError("One or more authors not found.", 404);
            }
        }
        return BookRepository.createBook(data);
    },
    async findAllBooks(query: paginationInput) {
        const skip = (query.page - 1) * query.limit;
        const [books, total] = await Promise.all([
            BookRepository.findAllBooks(skip, query.limit),
            BookRepository.countBooks(),
        ])
        return {
            data: books,
            pagination: {
                page: query.page,
                limit: query.limit,
                total,
                totalPages: Math.ceil(total / query.limit),
            }
        }
    },

    async findBookById(id: idParamInput) {
        const book = await BookRepository.findBookById(id);
        if (!book) {
            throw new AppError('Book not found', 404);
        }
        return book;
    },

    async updateBook(id: idParamInput, data: UpdateBookInput) {
        const book = await BookRepository.findBookById(id);
        if (!book) {
            throw new AppError('Book not found', 404);
        }
        if(data.isbn) {
            const existingISBN = await BookRepository.findBookByISBN(data.isbn);
            if(existingISBN && existingISBN.id !== book.id) {
                throw new AppError('ISBN already exists.', 409);
            }
        }
        if(data.barcode) {
            const existingBarcode = await BookRepository.findBookByBarcode(data.barcode);
            if (existingBarcode && existingBarcode.id !== book.id) {
                throw new AppError('Barcode already exists.', 409);
            }
        }

        return BookRepository.updateBook(id, data);
    },

    async softDeleteBook(id: idParamInput) {
        const book = await BookRepository.findBookIncludingDeleted(id);
        if(!book) {
            throw new AppError('Book not found', 404);
        }
        if(book.deletedAt !== null) {
            throw new AppError('Book already deleted.', 409);
        }
        return BookRepository.softDeleteBook(id);
    },

    async restoreBook(id: idParamInput) {
        const book = await BookRepository.findBookIncludingDeleted(id);
        if(!book) {
            throw new AppError('Book not found', 404);
        }
        if(book.deletedAt === null) {
            throw new AppError('Book has not deleted.', 409);
        }

        return BookRepository.restoreBook(id);
    }
}