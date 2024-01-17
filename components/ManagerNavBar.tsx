import { auth, signOut } from "@/auth"
import Link from "next/link"
import { Button } from "./ui/button"
import addManager from "@/lib/managers/add"

const ManagerNavBar = async () => {
    const session = await auth()
    return (
        <div className="lg:flex justify-between px-20 h-[100px] items-center hidden">
            <div className="flex gap-20">
                <h3 className="font-bold text-3xl text-sky-500">IT-Link</h3>
                <ul className="flex gap-10 items-center">
                    <li><Link className="text-2xl" href='/manager/engineer'>User</Link></li>
                    <li><Link className="text-2xl" href='/manager/company'>Company</Link></li>
                </ul>
            </div>
            <div className="flex items-center gap-5">
                <form action={async () => {
                    "use server"
                    await addManager()
                }}>
                    <Button>add</Button>
                </form>
                <span>{session?.user.email}</span>
                <form action={async () => {
                    "use server"
                    await signOut()
                }}>
                    <Button>Sign out</Button>
                </form>
            </div>
        </div>
    )
}

export default ManagerNavBar