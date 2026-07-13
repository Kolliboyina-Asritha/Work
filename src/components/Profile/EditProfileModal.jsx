import { useEffect, useState } from "react";

import "../../css/EditProfileModal.css";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function EditProfileModal({

    personalDetails,

    onClose,

    onSuccess

}) {

    const axiosPrivate = useAxiosPrivate();

    const [fullname, setFullname] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");

    const [profilePicture, setProfilePicture] = useState("");

    useEffect(() => {

        if (!personalDetails) return;

        setFullname(personalDetails.fullname || "");

        setPhoneNumber(personalDetails.phoneNumber || "");

        setProfilePicture(personalDetails.profilePicture || "");

    }, [personalDetails]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axiosPrivate.put(

                "/profile",

                {

                    fullname,

                    phoneNumber,

                    profilePicture

                }

            );

            alert("Profile updated successfully.");

            onSuccess();

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Unable to update profile."

            );

        }

    };

    return (

        <div className="edit-profile-overlay">

            <div className="edit-profile-modal">

                <h2>

                    Edit Profile

                </h2>

                <form onSubmit={handleSubmit}>

                    <label>

                        Full Name

                    </label>

                    <input

                        type="text"

                        value={fullname}

                        onChange={(e)=>

                            setFullname(e.target.value)

                        }

                        required

                    />

                    <label>

                        Phone Number

                    </label>

                    <input

                        type="text"

                        value={phoneNumber}

                        onChange={(e)=>

                            setPhoneNumber(e.target.value)

                        }

                    />

                    <label>

                        Profile Picture URL

                    </label>

                    <input

                        type="text"

                        value={profilePicture}

                        onChange={(e)=>

                            setProfilePicture(e.target.value)

                        }

                    />

                    <div className="edit-buttons">

                        <button type="submit">

                            Save Changes

                        </button>

                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={onClose}

                        >

                            Cancel

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditProfileModal;