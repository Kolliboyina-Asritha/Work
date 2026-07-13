import "../../css/PerformanceFilter.css";

function PerformanceFilter({

    month,
    year,
    setMonth,
    setYear,
    search,
    setSearch,
    department,
    setDepartment

}) {

    return (

        <div className="performance-filter">

            <input

                type="text"

                placeholder="Search employee..."

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

            />

            <select

                value={department}

                onChange={(e)=>setDepartment(e.target.value)}

            >

                <option value="">All Departments</option>

                <option value="HR">HR</option>

                <option value="Development">Development</option>

                <option value="Testing">Testing</option>

                <option value="UI/UX">UI/UX</option>

            </select>

            <select

                value={month}

                onChange={(e)=>setMonth(Number(e.target.value))}

            >

                {

                    Array.from({length:12},(_,i)=>(

                        <option

                            key={i+1}

                            value={i+1}

                        >

                            {new Date(0,i).toLocaleString("default",{

                                month:"long"

                            })}

                        </option>

                    ))

                }

            </select>

            <input

                type="number"

                value={year}

                onChange={(e)=>setYear(Number(e.target.value))}

            />

        </div>

    );

}

export default PerformanceFilter;