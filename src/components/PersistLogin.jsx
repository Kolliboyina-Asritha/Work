import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

function PersistLogin() {

    const [loading, setLoading] = useState(true);

    const { auth } = useAuth();

    const refresh = useRefreshToken();

    useEffect(() => {

        let isMounted = true;

        const verifyRefreshToken = async () => {

            try {

                console.log("Calling refresh...");

                await refresh();

                console.log("Refresh successful");

            } catch (err) {

                console.log("Refresh failed", err);

            } finally {

                if (isMounted) {

                    setLoading(false);

                }

            }

        };

        if (!auth?.accessToken) {

            verifyRefreshToken();

        } else {

            setLoading(false);

        }

        return () => {

            isMounted = false;

        };

    }, []);

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return <Outlet />;

}

export default PersistLogin;