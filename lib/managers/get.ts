import { db } from "../prismadb"

const getManagerByEmail = async (email: string) => {
    const user = await db.managers.findUnique({ where: { email } })
    if (!user) return null

    return user
}

const getManagerById = async (id: string) => {
    const user = await db.managers.findUnique({ where: { id } })
    if (!user) return null

    return user
}

export { getManagerByEmail, getManagerById }