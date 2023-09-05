import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req){

    //token will exist if logged in
    const token = await getToken({req, secret:process.env.JWT_SECRET});

    const { pathname } = req.nextUrl;

    // allow the request if is true
    if(pathname.includes('/api/auth') || token ){
        return NextResponse.next();
    }

     // If user is not logged in and the path is not `/login`, rewrite the URL
     if (!token && pathname !== '/login') {
        return NextResponse.redirect('http://localhost:3000/login');
    }  
}