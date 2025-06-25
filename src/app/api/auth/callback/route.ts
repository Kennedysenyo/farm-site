import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { Users, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { sendWelcomeEmail } from "@/actions/auth/emails/emails";
import { isCorrectFormat } from "@/utils/format-checker";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  console.log("This is the origin", origin);

  const code = searchParams.get("code");

  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) {
    next = "/";
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { id, email } = user;
        let userExist: Users[] = [];
        if (email) {
          userExist = await db
            .select()
            .from(users)
            .where(eq(users.email, email));
        } else {
          userExist = await db.select().from(users).where(eq(users.id, id!));
        }

        if (userExist.length === 0) {
          await db.insert(users).values({
            id,
            firstName: user.user_metadata.name.split(" ")[0] ?? "",
            lastName:
              user.user_metadata.name.split(" ")[
                user.user_metadata.name.split(" ").length - 1
              ] ?? "",
            email: user.user_metadata.email ?? "",
            phone: user.user_metadata.phone ?? "",
          });

          if (isCorrectFormat("email", user?.user_metadata.email)) {
            const response = await sendWelcomeEmail(
              user?.user_metadata.email,
              user?.user_metadata.name,
            );

            if (response) console.error(response);
          }
          const { error: response } = await supabase.auth.updateUser({
            data: {
              role:
                user.email === "kensenyocoding@gmail.com" ? "admin" : "user",
            },
          });
          if (response) console.error(response);
        } else {
          if (email) {
            await db
              .update(users)
              .set({
                id,
                firstName: user.user_metadata.name.split(" ")[0] ?? "",
                lastName:
                  user.user_metadata.name.split(" ")[
                    user.user_metadata.name.split(" ").length - 1
                  ] ?? "",
                email: user.user_metadata.email ?? "",
                phone: user.user_metadata.phone ?? "",
              })
              .where(eq(users.email, email!));
          }
        }
      }

      const cookiesStore = await cookies();
      cookiesStore.set("signin-success", "true", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60,
        path: "/",
      });

      const forwardedHost = request.headers.get("x-forwarded-host");
      console.log("this is the forwareded host", forwardedHost);
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
