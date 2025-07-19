'use server';
import { cookies } from "next/headers";
import users from "@/database/usersdata";

export async function loginUser(username: string, password: string) {
  const userCookies = await cookies();

  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    userCookies.set("authToken", JSON.stringify(user.username), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true, message: "Login successful" };
  } else {
    return { success: false, message: "Invalid credentials" };
  }
}
export async function logoutUser() {
  const userCookies = await cookies();
  userCookies.delete("authToken");
  return { success: true, message: "Logout successful" };
}
