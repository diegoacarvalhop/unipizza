import prismaClient from "../../prisma";

class ListTableService {
    async execute() {

        const tables = await prismaClient.table.findMany({
            select: {
                id: true,
                number: true,
                status: true
            },
            orderBy: {
                created_at: 'asc'
            }
        });

        return tables;
    }
}

export { ListTableService }