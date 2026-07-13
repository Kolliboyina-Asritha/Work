import { useEffect, useState } from "react";
import "./Navbar.css";
import { MdNotificationsNone } from "react-icons/md";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function Navbar() {

    const axiosPrivate = useAxiosPrivate();

    const [user, setUser] = useState({
        fullname: "",
        designation: "",
        profilePicture: ""
    });

    useEffect(() => {

        const getNavbarData = async () => {

            try {

                const response = await axiosPrivate.get("/profile/navbar");

                setUser(response.data);

            } catch (err) {

                console.log(err);

            }

        };

        getNavbarData();

    }, [axiosPrivate]);

    return (

        <div className="navbar">

            <input
                type="text"
                placeholder="Search employees, tasks..."
            />

            <div className="navbar-right">

                <div className="notification">

                    <MdNotificationsNone />

                    <span></span>

                </div>

                <div className="profile">

                    {
                        user.profilePicture ?

                            <img
                                src={user.profilePicture}
                                alt="profile"
                                className="avatar-image"
                            />

                            :

                            <div className="avatar">
                                {user.fullname?.charAt(0).toUpperCase()}
                            </div>

                    }

                    <div className="profile-info">

                        <h4>{user.fullname}</h4>

                        <p>{user.designation}</p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Navbar;