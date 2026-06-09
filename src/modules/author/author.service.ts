import {CreateAuthorInput, UpdateAuthorInput} from "./author.schema";
import {AuthorRepository} from "./author.repository";
import {idParamInput} from "../../shared/validations/common.schema";
import {AppError} from "../../utils/app.error";

export const AuthorService = {
    async createAuthor(data: CreateAuthorInput) {
        return AuthorRepository.createAuthor(data);
    },

    async findAuthorById(id: idParamInput) {
        const author = await AuthorRepository.findAuthorById(id);
        if(!author) {
            throw new AppError("Author not found", 404);
        }

        return author;
    },

    async getAllAuthors() {
        return AuthorRepository.findAllAuthors();
    },

    async updateAuthor(id: idParamInput, data: UpdateAuthorInput) {
        const author = await AuthorRepository.findAuthorById(id);
        if(!author) {
            throw new AppError("Author not found", 404);
        }
        return AuthorRepository.updateAuthor(id,data);
    },

    async softDeleteAuthor(id: idParamInput) {
        const author = await AuthorRepository.findAuthorByIdIncludingDeleted(id);
        if(!author) {
            throw new AppError("Author not found", 404);
        }
        if(author.deletedAt !== null) {
            throw new AppError("Author already deleted", 409);
        }
        return AuthorRepository.softDeleteAuthor(id);
    },

    async restoreAuthor(id: idParamInput) {
        const author = await AuthorRepository.findAuthorByIdIncludingDeleted(id);
        if(!author) {
            throw new AppError("Author not found", 404);
        }

        if(author.deletedAt === null) {
            throw new AppError("Author has not deleted", 409);
        }

        return AuthorRepository.restoredAuthor(id);
    }
}