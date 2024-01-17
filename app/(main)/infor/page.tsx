import { auth, signOut } from "@/auth"
import { Roles } from "@prisma/client";
import { redirect } from "next/navigation";

const InforPage = async() => {
    const session = await auth();
    if (session?.user.role == Roles.COMPANY_CONSULTANT) return redirect('/manager/company')

    if(session?.user.role == Roles.ENGINEER_CONSULTANT) return redirect('/manager/engineer')
    
    return (
        <div>
            {JSON.stringify(session)}
            <form action={ async () => {
                "use server"
                await signOut()
            }}>
                <button>sign out</button>
            </form>
        </div>
    )
}

export default InforPage