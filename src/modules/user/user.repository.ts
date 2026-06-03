import prisma from "../../config/prisma";
import {CreateUserRepositoryInput} from "./user.types";
import {UpdateUserInput} from "./user.schema";

export const UserRepository = {
    async getAllUsers(skip: number, take: number){
      return prisma.user.findMany(
          {
              where: {
                  deletedAt: null,
              },
              skip,
              take,
              orderBy: {
                  createdAt: "desc",
              },
              select: {
                  id: true,
                  username: true,
                  email: true,
                  firstName: true,
                  lastName: true,
                  phone: true,
                  isActive: true,
                  createdAt: true,
              },

          }
      );
    },

    async count() {
        return prisma.user.count({
            where: {
                deletedAt: null,
            },
        });
    },

    async getUserById(id: string){
        return prisma.user.findFirst({
            where:{
                id,
                deletedAt: null

            },
            select: {
                id: true,
                username: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                createdAt: true,
                userRole: {
                    include: {
                        role: true
                    }
                }
            },
        })
    },
   async create(data: CreateUserRepositoryInput) {
        return prisma.user.create({
            data,

            select: {
                id: true,
                username: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                createdAt: true,
            },
        })
    },
    async findByEmail(email: string) {
       return prisma.user.findUnique({
           where: { email , deletedAt: null },
       })
    },
    async findByUsername(username: string) {
       return prisma.user.findUnique({
           where: { username , deletedAt: null },
       })
    },

    async updateUserById(id: string,data: UpdateUserInput) {
        return prisma.user.update({
            where: {id, deletedAt: null},
            data,
            select: {
                id: true,
                username: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                createdAt: true,
            },
        })
    },
    async softDeleteUser(id: string) {
        return prisma.user.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                isActive: false,
            },
        });
    },
    async restoreUser(id: string) {
        return prisma.user.update({
            where: { id },
            data: {
                deletedAt: null,
            },
        });
    }
}