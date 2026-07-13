import "../../css/TopThree.css";

import {
    FaMedal,
    FaUserCircle
} from "react-icons/fa";

function TopThree({ leaderboard }) {

    const topThree = leaderboard.slice(0, 3);

    const medals = [

        {
            color: "#FFD700",
            title: "1st Place"
        },

        {
            color: "#C0C0C0",
            title: "2nd Place"
        },

        {
            color: "#CD7F32",
            title: "3rd Place"
        }

    ];

    return (

        <div className="top-three">

            {topThree.map((employee, index) => (

                <div
                    key={employee.employee?._id}
                    className={`top-card rank-${index + 1}`}
                >

                    <FaMedal
                        size={34}
                        color={medals[index].color}
                    />

                    <div className="avatar">

                        <FaUserCircle size={70} />

                    </div>

                    <h3>

                        {employee.employee?.fullname}

                    </h3>

                    <p>

                        {employee.employee?.designation}

                    </p>

                    <h1>

                        {employee.overallScore}

                    </h1>

                    <span>

                        {medals[index].title}

                    </span>

                </div>

            ))}

        </div>

    );

}

export default TopThree;