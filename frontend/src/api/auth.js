
import axios from "./axios";

const login = async ({ username, password, setAuth, navigate }) => {
    try {
        const response = await axios.post(`/auth`, {
            username,
            password
        },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        

        const accessToken = response?.data.accessToken
        const role = response?.data.role

        setAuth({ username, password, role, accessToken })

        navigate('/dash');
    } catch (error) {

    }
};

export { login };