import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {

    const { setAuth } = useAuth();

    const logout = async () => {

        try {

            await axios.post(
                "/logout",
                {},
                {
                    withCredentials: true
                }
            );

        } catch (err) {

            console.error(err);

        } finally {

            // Clear React auth state even if the request fails
            setAuth({});

        }

    };

    return logout;

};

export default useLogout;