import prismaClient from "../../prisma";

interface MenuRequest {
    table_id: string;
    close_bill: boolean;
}

class CloseBillMenuService {
    async execute({ table_id, close_bill }: MenuRequest) {

        const table = await prismaClient.table.update({
            where: {
                id: table_id
            },
            data: {
                close_bill: close_bill
            }
        })

        return table;
    }
}

export { CloseBillMenuService }