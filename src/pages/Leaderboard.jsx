import { useEffect, useState } from "react";

import "../css/Leaderboard.css";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

import LeaderboardHeader from "../components/leaderboard/LeaderboardHeader";
import TopThree from "../components/leaderboard/TopThree";
import LeaderboardTable from "../components/leaderboard/LeaderboardTable";

function Leaderboard() {

    const axiosPrivate = useAxiosPrivate();

    const today = new Date();

    const [month, setMonth] = useState(today.getMonth() + 1);
    const [year, setYear] = useState(today.getFullYear());

    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadLeaderboard();

    }, [month, year]);

    const loadLeaderboard = async () => {

        try {

            setLoading(true);

            const response = await axiosPrivate.get(

                `/performance/leaderboard/monthly?month=${month}&year=${year}`

            );

            setLeaderboard(response.data.leaderboard);

        }

        catch (err) {

            console.error(err);

            setLeaderboard([]);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="leaderboard-page">

            <LeaderboardHeader

                month={month}
                year={year}
                setMonth={setMonth}
                setYear={setYear}

            />

            <TopThree leaderboard={leaderboard} />

            <LeaderboardTable

                leaderboard={leaderboard}
                loading={loading}

            />

        </div>

    );

}

export default Leaderboard;