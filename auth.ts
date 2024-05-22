import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers"
import { addUser, getUser } from "./lib/redis";
import { ZodError, z } from "zod";

const signInSchema = z.object({
  username: z.string({ required_error: "请输入您的用户名" }),
  password: z
    .string({ required_error: "请输入您的密码" })
    .min(8, "最少为8个字符")
    .max(16, "最多为16个字符"),
});

const Credentials = CredentialsProvider({
  name: "密码登录",
  // `credentials` 用于渲染登录页面表单
  credentials: {
    username: { label: "用户", type: "text", placeholder: "输入您的用户名" },
    password: { label: "密码", type: "password", placeholder: "输入您的密码" },
  },
  // 处理从用户收到的认证信息
  authorize: async (credentials, req) => {
    try {
      type PromiseType<T extends Promise<unknown>> = T extends Promise<infer U>
        ? U
        : never;
      // 默认情况下不对用户输入进行验证，确保使用 Zod 这样的库进行验证
      let user: PromiseType<ReturnType<typeof getUser>> | null = null;
      const { username, password } = await signInSchema.parseAsync(credentials);
      // 登陆信息验证
      user = await getUser(username, password);

      // 密码错误
      if (user === 1) return null;

      // 用户注册
      if (user === 0) {
        user = await addUser(username, password);
      }

      if (!user) {
        throw new Error("User was not found and could not be created.");
      }

      return {
        name: user.name,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(error.errors)
        // Return `null` to indicate that the credentials are invalid
        return null;
      }
      return null;
    }
  },
});

const providers = [
  Credentials,
  GitHub,
] satisfies Provider[]

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider({})
    return { id: providerData.id, name: providerData.name }
  } else {
    return { id: provider.id, name: provider.name }
  }
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Credentials, GitHub],
  pages: {
    // signIn: '/auth/signin'
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith("/note/edit")) return !!auth;
      return true;
    },
  },
});

