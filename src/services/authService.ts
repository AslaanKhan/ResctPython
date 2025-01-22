import api from "./api"

interface LoginCredentials {
    username: string
    password: string
}

interface SignupCredentials {
    email: string
    username: string
    password: string
}

interface AuthResponse {
    data: {
        token: string
        user: {
            id: string
            email: string
            name: string
        }
    }
}

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>("/login", credentials)
        localStorage.setItem("token", response.data.data.token)
        return response.data
    },

    async signup(credentials: SignupCredentials): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>("/signup", credentials)
        localStorage.setItem("token", response.data.data.token)
        return response.data
    },

    async logout(): Promise<void> {
        await api.post("/auth/logout")
        localStorage.removeItem("token")
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem("token")
    },
}

