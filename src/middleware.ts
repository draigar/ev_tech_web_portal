import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest, response: NextResponse) {
    let cookie: any = request.cookies.get('Auth')
    cookie = cookie && JSON.parse(cookie?.value).token.access_token
    // if (request.nextUrl.pathname.startsWith('/')) {
    //     // return NextResponse.redirect(new URL('/app', request.url))
    // }
}
