import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { apiInstance } from './config'
import { BASE_URL } from './roots'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, response: NextResponse) {
    let cookie: any = request.cookies.get('Auth')
    cookie = cookie && JSON.parse(cookie?.value).token.access_token
    // const data = await (await fetch(BASE_URL + 'auth/details', { headers: { Authorization: `Bearer ${cookie}` } })).json()
    // if (data.detail === "Invalid token") {
    //     response.cookies?.set('Auth', '=')
    // }

    // if (request.nextUrl.pathname.startsWith('/')) {
    //     // return NextResponse.redirect(new URL('/app', request.url))
    // }
}
