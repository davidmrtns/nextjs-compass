import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { UserRole } from '@/types/user';
import { DecodedToken } from '@/types/token';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'chave_secreta_aleatoria');

// rotas protegidas
const adminRoutes = ['/users'];
const apiProtectedRoutes = ['/api/user'];
const protectedRoutes = [...adminRoutes, ...apiProtectedRoutes];

// raiz das rotas
export const rootRoute = '/';
export const apiRoute = '/api';
export const loginRoute = '/login';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;

    // redireciona para raiz se acessar a página de login já autenticado
    if (pathname.startsWith(loginRoute) && token) {
        try {
            const decodedToken = await jwtVerify(token, JWT_SECRET) as DecodedToken;
            if (decodedToken) {
                return NextResponse.redirect(new URL(rootRoute, request.url));
            }
        } catch (err) {
            return NextResponse.next();
        }
    }

    // se a rota não for protegida, deixa passar
    if (!protectedRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    // se não houver token, redireciona para a página de login
    if (!token) {
        if(pathname.startsWith(apiRoute)){
            return NextResponse.json({ error: 'Token not found' }, { status: 401 });
        }
        return NextResponse.redirect(new URL(loginRoute, request.url));
    }

    // validação geral das rotas
    try {
        const decodedToken = await jwtVerify(token, JWT_SECRET) as DecodedToken;

        // permite acesso a rotas de admin apenas para usuários com role ADMIN
        if(adminRoutes.some(route => pathname.startsWith(route))){
            if(decodedToken.payload.role === UserRole.ADMIN){
                return NextResponse.next();
            }else{
                return NextResponse.error();
            }
        }
        return NextResponse.next();
    } catch (err) {
        if(pathname.startsWith(apiRoute)){
            return NextResponse.json({ error: 'Could not validate token' }, { status: 401 });
        }
        return NextResponse.redirect(new URL(loginRoute, request.url));
    }
}

export const config = {
    matcher: [ ...protectedRoutes + '/:path*'],
};

