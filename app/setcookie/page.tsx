"use server"
import {cookies} from "next/headers"

export default async function setCookies(){
    const userCookies = await cookies();
    userCookies.set("name","Anurag")
}