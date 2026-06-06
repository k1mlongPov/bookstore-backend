import {PublisherInput, UpdatePublisherInput} from "./publisher.schema";
import prisma from "../../config/prisma";
import {idParamInput} from "../../shared/validations/common.schema";

export const PublisherRepository = {
    async createPublisher(data:PublisherInput) {
        return prisma.publisher.create({data});
    },
    async findPublisherById(id: string) {
        return prisma.publisher.findFirst({
            where: {
                id,
                deletedAt: null,
            }
        })
    },
    async findPublisherByName(name: string) {
        return prisma.publisher.findUnique({
            where: {
                name,
                deletedAt: null,
            }
        })
    },
    async findPublisherByEmail(email: string) {
        return prisma.publisher.findUnique({
            where: {
                email,
                deletedAt: null,
            }
        })
    },
    async getAllPublishers(skip: number, take: number) {
        return prisma.publisher.findMany({
            where:{deletedAt:null},
            skip,
            take,
            orderBy: {
                createdAt: 'desc',
            }
        });
    },
    async countPublishers() {
        return prisma.publisher.count({
            where: {
                deletedAt: null,
            }
        });
    },
    async updatePublisher(id: idParamInput, data: UpdatePublisherInput) {
        return prisma.publisher.update({
            where:id,
            data
        })
    },

    async deletePublisher(id: idParamInput) {
        return prisma.publisher.update({
            where: id,
            data: {
                deletedAt: new Date(),
            }
        })
    }


}