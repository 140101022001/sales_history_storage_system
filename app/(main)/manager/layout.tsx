import ManagerNavBar from "@/components/ManagerNavBar"

const ManagerLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            <ManagerNavBar/>
            {children}
        </main>
    )
}

export default ManagerLayout