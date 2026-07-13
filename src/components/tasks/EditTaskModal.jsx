import { useEffect, useState } from "react";

import "../../css/CreateTaskModal.css";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
function EditTaskModal({

    task,

    onClose,

    refreshTasks

}) {

    const axiosPrivate = useAxiosPrivate();

    const [employees, setEmployees] = useState([]);

    const [title, setTitle] = useState(task.title);

    const [description, setDescription] = useState(task.description || "");

    const [assignedTo, setAssignedTo] = useState(task.assignedTo?._id);

    const [priority, setPriority] = useState(task.priority);

    const [deadline, setDeadline] = useState(

        task.deadline?.substring(0,10)

    );

    const [loading,setLoading]=useState(false);

const fetchMembers = async () => {

    try{

        const response = await axiosPrivate.get(

            "/teammembers"

        );

        setEmployees(response.data);

    }

    catch(err){

        console.error(err);

    }

};

useEffect(()=>{

    fetchMembers();

},[]);
const handleSubmit = async(e)=>{

    e.preventDefault();

    try{

        setLoading(true);

        await axiosPrivate.patch(

            `/task/${task._id}`,

            {

                title,

                description,

                assignedTo,

                priority,

                deadline

            }

        );

        refreshTasks();

        onClose();

    }

    catch(err){

        console.error(err);

        alert(

            err.response?.data?.message ||

            "Failed to update task"

        );

    }

    finally{

        setLoading(false);

    }

};
return (

    <div className="modal-overlay">

        <div className="modal">

            <h2>Edit Task</h2>

            <form onSubmit={handleSubmit}>

                <label>

                    Task Title

                </label>

                <input

                    type="text"

                    value={title}

                    onChange={(e) =>
                        setTitle(e.target.value)
                    }

                    required

                />

                <label>

                    Description

                </label>

                <textarea

                    rows="4"

                    value={description}

                    onChange={(e) =>
                        setDescription(e.target.value)
                    }

                />

                <label>

                    Assign To

                </label>

                <select

                    value={assignedTo}

                    onChange={(e) =>
                        setAssignedTo(e.target.value)
                    }

                    required

                >

                    <option value="">

                        Select Employee / Intern

                    </option>

                    {

                        employees.map(member => (

                            <option

                                key={member._id}

                                value={member._id}

                            >

                                {member.fullname} ({member.designation})

                            </option>

                        ))

                    }

                </select>

                <label>

                    Priority

                </label>

                <select

                    value={priority}

                    onChange={(e) =>
                        setPriority(e.target.value)
                    }

                >

                    <option value="Low">Low</option>

                    <option value="Medium">Medium</option>

                    <option value="High">High</option>

                    <option value="Critical">Critical</option>

                </select>

                <label>

                    Deadline

                </label>

                <input

                    type="date"

                    value={deadline}

                    onChange={(e) =>
                        setDeadline(e.target.value)
                    }

                    required

                />

                <div className="modal-buttons">

                    <button

                        type="button"

                        className="cancel-btn"

                        onClick={onClose}

                    >

                        Cancel

                    </button>

                    <button

                        type="submit"

                        className="save-btn"

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Updating..."

                                : "Update Task"

                        }

                    </button>

                </div>

            </form>

        </div>

    </div>

);
}
export default EditTaskModal;