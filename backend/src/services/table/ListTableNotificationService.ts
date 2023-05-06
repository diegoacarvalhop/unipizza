import prismaClient from "../../prisma";

class ListTableNotificationService {
    async execute() {

        const tables = await prismaClient.table.findMany({
            where: {
                OR: [
                    {
                        call_waiter: true
                    },
                    {
                        close_bill: true
                    }
                ]
            },
            orderBy: {
                created_at: 'asc'
            }
        });

        return tables;
    }
}

export { ListTableNotificationService }