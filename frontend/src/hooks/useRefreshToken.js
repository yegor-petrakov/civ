import axios from "@/api/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        try {
            const response = await axios.get('/auth/refresh', {
                withCredentials: true
            })

            setAuth(prev => {
                return { 
                    ...prev, 
                    accessToken: response.data.accessToken, 
                    role: response.data.role,
                    username: response.data.username
                }
            })

            return response.data.accessToken
        } catch (error) {
            // Handle error if necessary
            throw error;
        }
    }

    return refresh
}

export default useRefreshToken
