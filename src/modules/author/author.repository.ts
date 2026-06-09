import {CreateAuthorInput, UpdateAuthorInput} from "./author.schema";
import prisma from "../../config/prisma";
import {idParamInput} from "../../shared/validations/common.schema";

export const AuthorRepository = {
    async createAuthor(data: CreateAuthorInput) {
        return prisma.author.create({data})
    },
    async findAuthorById(authorId:idParamInput) {
        return prisma.author.findFirst({
            where: {
                id: authorId.id,
                deletedAt: null,
            },
            include: {
                bookAuthor: true,
            }
        })
    },
    async findAuthorByIdIncludingDeleted(id: idParamInput) {
        return prisma.author.findUnique({
            where: {
                id: id.id
            }
        });
    },
    async findAllAuthors() {
        return prisma.author.findMany({
            include: {
                bookAuthor: true,
            },
            where: {
                deletedAt: null,
            }
        });
    },

    async updateAuthor(authorId:idParamInput, data: UpdateAuthorInput) {
        return prisma.author.update({
            where: {
                id: authorId.id,
            },
            data,
        })
    },

    async softDeleteAuthor(authorId:idParamInput) {
        return prisma.author.update({
            where: {
                id: authorId.id,
            },
            data: {
                deletedAt: new Date(),
            }
        })
    },

    async restoredAuthor(authorId:idParamInput) {
        return prisma.author.update({
            where: {
                id: authorId.id
            },
            data: {
                deletedAt: null
            }
        })
    }
}