import prismaClient from "../../prisma";

class ListCategoryService {
    async execute() {

        const categories = await prismaClient.category.findMany({
            select: {
                id: true,
                name: true,
                status: true
            },
            orderBy: {
                name: 'asc'
            }
        });

        return categories;
    }
}

export { ListCategoryService }