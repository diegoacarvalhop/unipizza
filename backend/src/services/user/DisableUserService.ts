import prismaClient from "../../prisma";

interface UserRequest {
    user_id: string;
    disable: boolean;
}

class DisableUserService {
    async execute({ user_id, disable }: UserRequest) {
        const user = await prismaClient.user.update({
            where: {
                id: user_id
            },
            data: {
                status: !disable,
                updated_at: new Date()
            }
        });

        return user;
    }
}

export { DisableUserService }