import prismaClient from "../../prisma";

class ListPaymentsService {
    async execute() {

        const payments = await prismaClient.payment.findMany({
            select: {
                id: true,
                total_amount: true,
                amount_paid: true,
                amount_pix: true,
                amount_money: true,
                amount_debit: true,
                amount_credit: true,
                created_at: true,
                user: {
                    select: {
                        name: true
                    }
                },
                table: {
                    select: {
                        number: true
                    }
                }
            },
            orderBy: {
                created_at: 'asc'
            }
        })

        return payments;

    }
}

export { ListPaymentsService }