import { cookies } from "next/headers";
import PasswordPromptDialog from "../../components/passwordPromptDialog";
import AdminInput from "../../components/adminInput";

export default async function EntryPoint() {

    const cookiesStore = await cookies();
    const loginCookies = cookiesStore.get(process.env.NEXT_PUBLIC_PASSWORD_COOKIE_NAME);
    const isLoggedIn = !!loginCookies?.value;
    


    if (!isLoggedIn) {
        return <PasswordPromptDialog />
    }
    return <AdminInput />

}