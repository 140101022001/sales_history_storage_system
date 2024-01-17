"use server"

import addManagerSchema from "@/prisma/schemas/addManagerSchema"
import * as z from "zod"
import { db } from "../prismadb"
import { Roles } from "@prisma/client"
import { enCryptData } from "../crypto"

const datas = {
    email: 'hung@gmail.com',
    password: '123456',
    firstname: 'hung',
    lastname: 'nguyen',
}

// const addManager = (data: z.infer<typeof addManagerSchema>) => {
//     const validatedFields = addManagerSchema.safeParse(data);
//     if (!validatedFields) console.log('err');
//     console.log(data);
// }

const addManager =async () => {
    try {
        const encryptedPassword = enCryptData(datas.password);
        datas.password = encryptedPassword; 
        const newM = await db.managers.create({
            data: datas
        })
        return newM
    } catch (err) {
        console.log(err);
    }
}
export default addManager;