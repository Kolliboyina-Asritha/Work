import "./StatsGrid.css";
import StatCard from "./StatCard";

function StatsGrid({ cards }) {

    return (

        <div className="stats-grid">

            {cards.map((card, index) => (

                <StatCard

                    key={index}

                    title={card.title}

                    value={card.value}

                />

            ))}

        </div>

    );

}

export default StatsGrid;