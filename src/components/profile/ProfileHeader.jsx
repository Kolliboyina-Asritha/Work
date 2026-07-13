import "../../css/ProfileHeader.css";

import { FaUserEdit } from "react-icons/fa";

function ProfileHeader({

    personalDetails,

    onEdit

}) {

    if (!personalDetails) return null;

    const {

        profilePicture,

        fullname,

        employeeId,

        designation,

        department,

        email,

        joiningDate

    } = personalDetails;

    return (

        <div className="profile-header">

            <div className="profile-header-left">

                <img

                    src={
                        profilePicture ||
                        "https://via.placeholder.com/140?text=User"
                    }

                    alt="Profile"

                    className="profile-picture"

                />

                <div className="profile-basic-info">

                    <h2>{fullname}</h2>

                    <p>{designation}</p>

                    <p>{department}</p>

                </div>

            </div>

            <div className="profile-header-right">

                <div className="profile-details">

                    <p>

                        <strong>Employee ID:</strong>{" "}

                        {employeeId || "-"}

                    </p>

                    <p>

                        <strong>Email:</strong>{" "}

                        {email}

                    </p>

                    <p>

                        <strong>Joining Date:</strong>{" "}

                        {joiningDate
                            ? new Date(joiningDate).toLocaleDateString()
                            : "-"}

                    </p>

                </div>

                <button

                    className="edit-profile-btn"

                    onClick={onEdit}

                >

                    <FaUserEdit />

                    Edit Profile

                </button>

            </div>

        </div>

    );

}

export default ProfileHeader;