import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // برای تست، یک نام کاربری و رمز عبور ساده تعریف می‌کنیم
        const user = {
          username: "testuser", // نام کاربری نمونه
          password: "password123", // رمز عبور نمونه
        };

        // اگر نام کاربری و رمز عبور درست بود، کاربر را وارد می‌کنیم
        if (
          credentials?.username === user.username &&
          credentials?.password === user.password
        ) {
          return user;
        }
        return null; // اگر نام کاربری یا رمز عبور اشتباه باشد، کاربر رد می‌شود
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // صفحه ورود که در اینجا ایجاد می‌کنیم
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
