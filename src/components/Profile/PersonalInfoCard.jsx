import "../../css/PersonalInfoCard.css";

import {
    FaPhone,
    FaUserFriends,
    FaEdit
} from "react-icons/fa";

function PersonalInfoCard({

    personalDetails,

    onEdit

}) {

    if (!personalDetails) return null;

    const {

        phoneNumber,
        reportingManager

    } = personalDetails;

    return (

        <div className="personal-info-card">

            <div className="personal-info-header">

                <h3>
                    Personal Information
                </h3>

                <button

                    className="edit-personal-btn"

                    onClick={onEdit}

                >

                    <FaEdit />

                    Edit

                </button>

            </div>


            <div className="personal-info-grid">


                <div className="info-item">

                    <FaPhone className="info-icon" />

                    <div>

                        <span>
                            Phone Number
                        </span>

                        <p>
                            {phoneNumber || "Not Provided"}
                        </p>

                    </div>

                </div>


                <div className="info-item">

                    <FaUserFriends className="info-icon" />

                    <div>

                        <span>
                            Reporting Manager
                        </span>

                        <p>
                            {
                                reportingManager?.fullname
                                    ||
                                "Not Assigned"
                            }
                        </p>

                    </div>

                </div>


            </div>

        </div>

    );

}

export default PersonalInfoCard;