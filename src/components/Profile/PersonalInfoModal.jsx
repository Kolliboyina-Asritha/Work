import { useEffect, useState } from "react";

import "../../css/PersonalInfoModal.css";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function PersonalInfoModal({

    personalDetails,

    onClose,

    onSuccess

}) {

    const axiosPrivate = useAxiosPrivate();

    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {

        if (!personalDetails) return;

        setPhoneNumber(
            personalDetails.phoneNumber || ""
        );

    }, [personalDetails]);


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axiosPrivate.put("/profile", {

                phoneNumber

            });

            alert("Profile updated successfully.");

            onSuccess();

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Failed to update profile."

            );

        }

    };


    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>
                    Edit Personal Information
                </h2>


                <form onSubmit={handleSubmit}>


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


                    <div className="modal-buttons">


                        <button type="submit">

                            Save

                        </button>


                        <button

                            type="button"

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

export default PersonalInfoModal;