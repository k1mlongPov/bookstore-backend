import {CreateBookInput, UpdateBookInput} from "./book.schema";
import prisma from "../../config/prisma";
import {idParamInput} from "../../shared/validations/common.schema";

export const BookRepository = {
    async createBook(data: CreateBookInput) {
        const { authorIds, ...bookData } = data;

        return prisma.book.create({
            data: {
                ...bookData,
                bookAuthor: {
                    create: authorIds?.map(authorId => ({authorId})) ?? []
                }
            },
            include: {
                bookAuthor: {
                    include: {
                        author: true
                    }
                }
            }
        });
    },

    async findBookById(bookId: idParamInput) {
        return prisma.book.findFirst({
            where: {
                id: bookId.id,
                deletedAt: null,
            },
            include: {
                category: true,
                publisher: true,
                supplier: true,
                bookAuthor: {
                    include: {
                        author: true
                    }
                }
            }
        })
    },
    async findBookByISBN(isbn: string) {
        return prisma.book.findUnique({
            where: {isbn: isbn},
        })
    },
    async findBookByBarcode(barcode: string) {
        return prisma.book.findUnique({
            where:{barcode:barcode},
        })
    },
    async findAllBooks(skip: number, take: number) {
        return prisma.book.findMany({
            where: {
                deletedAt: null,
            },
            skip,
            take,
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                category: true,
                publisher: true,
                supplier: true,
                bookAuthor: {
                    include: {
                        author: true
                    }
                }
            }
        })
    },
    async countBooks() {
        return prisma.book.count({
            where: {deletedAt: null},
        })
    },
    async findBookIncludingDeleted(id: idParamInput) {
        return prisma.book.findUnique({
            where: id
        });
    },
    async updateBook(bookId: idParamInput,data: UpdateBookInput) {
        const { authorIds, ...bookData } = data;

        await prisma.book.update({
            where: {
                id: bookId.id
            },
            data: {
                ...bookData,
                bookAuthor: {
                    deleteMany: {},
                    create: authorIds?.map(authorId => ({
                        authorId
                    })) ?? []
                }
            }
        });
    },
    async softDeleteBook(bookId: idParamInput) {
        return prisma.book.update({
            where: {
                id: bookId.id
            },
            data: {
                deletedAt: new Date(),
                isActive: false
            }
        })
    },
    async restoreBook(bookId: idParamInput) {
        return prisma.book.update({
            where: {
                id: bookId.id
            },
            data: {
                deletedAt: null,
                isActive: true
            }
        })
    }
}