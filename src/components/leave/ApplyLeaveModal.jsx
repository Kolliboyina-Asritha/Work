import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import "../../css/ApplyLeaveModal.css";

function ApplyLeaveModal({ onClose, onSuccess }) {

    const axiosPrivate = useAxiosPrivate();

    const [leaveType, setLeaveType] = useState("CL");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [reason, setReason] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const today = new Date().toISOString().split("T")[0];

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!fromDate || !toDate || !leaveType || !reason.trim()) {

            setError("Please fill all fields.");

            return;

        }

        if (fromDate > toDate) {

            setError("From Date cannot be after To Date.");

            return;

        }

        try {

            setLoading(true);

            await axiosPrivate.post("/leave", {

                leaveType,

                fromDate,

                toDate,

                reason: reason.trim()

            });

            alert("Leave applied successfully.");

            if (onSuccess) {

                onSuccess();

            }

        }

        catch (err) {

            console.log(err);

            setError(

                err.response?.data?.message ||

                "Unable to apply leave."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="modal-overlay">

            <div className="apply-leave-modal">

                <div className="modal-header">

                    <h2>Apply Leave</h2>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Leave Type</label>

                        <select

                            value={leaveType}

                            onChange={(e) =>
                                setLeaveType(e.target.value)
                            }

                        >

                            <option value="CL">
                                Casual Leave (CL)
                            </option>

                            <option value="SL">
                                Sick Leave (SL)
                            </option>

                            <option value="PL">
                                Paid Leave (PL)
                            </option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>From Date</label>

                        <input

                            type="date"

                            value={fromDate}

                            min={today}

                            onChange={(e) =>
                                setFromDate(e.target.value)
                            }

                            required

                        />

                    </div>

                    <div className="form-group">

                        <label>To Date</label>

                        <input

                            type="date"

                            value={toDate}

                            min={fromDate || today}

                            onChange={(e) =>
                                setToDate(e.target.value)
                            }

                            required

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Reason

                            <span className="char-count">

                                {reason.length}/300

                            </span>

                        </label>

                        <textarea

                            rows="4"

                            maxLength={300}

                            placeholder="Enter reason..."

                            value={reason}

                            onChange={(e) =>
                                setReason(e.target.value)
                            }

                            required

                        />

                    </div>

                    {

                        error && (

                            <div className="leave-error">

                                {error}

                            </div>

                        )

                    }

                    <div className="modal-actions">

                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={onClose}

                            disabled={loading}

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="submit-btn"

                            disabled={loading}

                        >

                            {

                                loading

                                    ? "Applying..."

                                    : "Apply Leave"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default ApplyLeaveModal;