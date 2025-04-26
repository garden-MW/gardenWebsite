import { cookies } from "next/headers";
import PasswordPromptDialog from "../../components/passwordPromptDialog";
import AdminInput from "../../components/adminInput";

export default async function EntryPoint() {

    const cookiesStore = await cookies();
    const loginCookies = cookiesStore.get(process.env.NEXT_PUBLIC_PASSWORD_COOKIE_NAME);
    const isLoggedIn = !!loginCookies?.value;
    


    if (!isLoggedIn) {
        return (
            <div className="w-screen h-full mb-10">
                <PasswordPromptDialog />
            </div>
        
        )

    }
    return (
        <div className="w-full h-full mb-3">
            <AdminInput />
        </div>
    
    )

}