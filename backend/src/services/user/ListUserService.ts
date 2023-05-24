import prismaClient from "../../prisma";

class ListUserService {
    async execute() {

        const users = await prismaClient.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                status: true,
                is_logged: true               
            },
            orderBy: {
                name: 'asc'
            }
        });

        return users;
    }
}

export { ListUserService }