import Logo from "./logo";
import Menu from "./menu"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/AuthOptions";

import { MenuFunc } from './menuProps'

const Sidebar = async () => {
    const session:any = await getServerSession(authOptions)
    const Data = MenuFunc(session?.user?.Username)
    return (
        <header className="w-[35vh] bg-secondary-color border">
                <div className="sticky h-[100vh] transition-all duration-300 top-0 z-10 flex flex-col lg:py-8">
                    <Logo/>
                    <Menu list={Data}/>
                </div>
        </header>
    )
}

export default Sidebar