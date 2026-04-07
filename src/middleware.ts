import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/produtos/:path*",
    "/estoque/:path*",
    "/vendas/:path*",
    "/relatorios/:path*",
    "/configuracoes/:path*",
  ],
};