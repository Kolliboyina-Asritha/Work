import { useEffect, useState, useCallback } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "./AttendanceButtons.css";
function AttendanceButtons({ onSuccess }) {

    const axiosPrivate = useAxiosPrivate();

    const [loadingCheckIn, setLoadingCheckIn] = useState(false);
    const [loadingCheckOut, setLoadingCheckOut] = useState(false);

    const [status, setStatus] = useState({
        checkedIn: false,
        checkedOut: false,
        status: "Absent"
    });

    const fetchStatus = useCallback(async () => {

        try {

            const res = await axiosPrivate.get("/attendance/status");

            setStatus(res.data);

        }

        catch (err) {

            console.log(err);

        }

    }, [axiosPrivate]);

    useEffect(() => {

        fetchStatus();

    }, [fetchStatus]);

    const handleCheckIn = async () => {

        try {

            setLoadingCheckIn(true);

            await axiosPrivate.post("/attendance/checkin");

            alert("Checked In Successfully");

            await fetchStatus();

            if (onSuccess) {

                await onSuccess();

            }

        }

        catch (err) {

            alert(
                err.response?.data?.message ||
                "Check In Failed"
            );

        }

        finally {

            setLoadingCheckIn(false);

        }

    };

    const handleCheckOut = async () => {

        try {

            setLoadingCheckOut(true);

            await axiosPrivate.put("/attendance/checkout");

            alert("Checked Out Successfully");

            await fetchStatus();

            if (onSuccess) {

                await onSuccess();

            }

        }

        catch (err) {

            alert(
                err.response?.data?.message ||
                "Check Out Failed"
            );

        }

        finally {

            setLoadingCheckOut(false);

        }

    };

    const isLeave = status.status === "Leave";

    return (

        <div className="attendance-buttons">

            <button
                className="checkin-btn"
                onClick={handleCheckIn}
                disabled={
                    loadingCheckIn ||
                    status.checkedIn ||
                    isLeave
                }
            >

                {
                    loadingCheckIn
                        ? "Checking In..."
                        : isLeave
                            ? "On Leave"
                            : status.checkedIn
                                ? "Checked In"
                                : "Check In"
                }

            </button>

            <button
                className="checkout-btn"
                onClick={handleCheckOut}
                disabled={
                    loadingCheckOut ||
                    !status.checkedIn ||
                    status.checkedOut ||
                    isLeave
                }
            >

                {
                    loadingCheckOut
                        ? "Checking Out..."
                        : isLeave
                            ? "On Leave"
                            : status.checkedOut
                                ? "Checked Out"
                                : "Check Out"
                }

            </button>

        </div>

    );

}

export default AttendanceButtons;