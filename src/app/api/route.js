import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function POST(request){
    try{
        const data = await request.json();
        const password = data.password;
        if (!process.env.NEXT_PUBLIC_PASSWORD_COOKIE_NAME) {
            throw new Error("PASSWORD_COOKIE_NAME is not defined");
        }
        const cookie = serialize(process.env.NEXT_PUBLIC_PASSWORD_COOKIE_NAME, "true", {
            httpOnly: true,
            path: "/",
        });
        if (process.env.PAGE_PASSWORD !== password){
            return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
        }
        const response= NextResponse.json({ message: "Password correct" }, {status: 200});
        response.headers.set("Set-Cookie", cookie);
        return response;
    }catch(error){
        return NextResponse.error(error);
    }
}