import { jwtDecode } from "jwt-decode"

export const hasExpiredToken = (token: string) => {

    const { exp } = jwtDecode(token);
    const currentData = new Date().getDate();

    if (exp && exp <= currentData) {
        return true
    }

    return false
}