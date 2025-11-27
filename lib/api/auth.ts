import { ApiErr } from "@/type/api.interface";
import { LoginType, RegisterType } from "@/type/auth.interface";
const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function Register(params: RegisterType) {
    const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    })
    if (!response.ok) {
        const err: ApiErr = await response.json()
        throw {
            status: response.status,
            error: err.error,
            message: err.message
        }
    }
    return response.json()
}

export async function Login(params: LoginType) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(params)
    })

    if (!response.ok) {
        const err: ApiErr = await response.json()
        throw {
            status: response.status,
            error: err.error,
            message: err.message
        }
    }
    return response.json()

}