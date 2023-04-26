import prismaClient from "../../prisma";

class BusyTableService {
    async execute(number: string) {

        const tableFind = await prismaClient.table.findFirst({
            where: {
                number: number
            }
        })

        const table = await prismaClient.table.update({
            where: {
                id: tableFind.id
            },
            data: {
                table_busy: true
            }
        });

        return table;
    }
}

export { BusyTableService }