import { RegisterType } from "@/type/auth.interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function Register(params: RegisterType) {
    const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify(params)
    })
    if (!response.ok) {
        const err = await response.json()
        throw new Error(err.message || "Ошибка входа")
    }
    return response.json()
}