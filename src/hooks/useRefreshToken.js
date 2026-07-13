import axios from "../api/axios";
import useAuth from "./useAuth";
import { jwtDecode } from "jwt-decode";

const useRefreshToken = () => {

    const { setAuth } = useAuth();

    const refresh = async () => {

        const response = await axios.get(
            "/refresh",
            {
                withCredentials: true
            }
        );

        const accessToken = response.data.accessToken;

        const decoded = jwtDecode(accessToken);

        setAuth({

            accessToken,

            id: decoded.UserInfo.id,

            email: decoded.UserInfo.email,

            roles: decoded.UserInfo.roles

        });

        return accessToken;

    };

    return refresh;

};

export default useRefreshToken;