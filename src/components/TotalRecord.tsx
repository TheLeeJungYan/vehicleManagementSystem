import { DashboardContext } from "@/context/DashboardContext";
import { useContext } from "react";
const TotalRecord:React.FC = () => {
    const dashboardContext = useContext(DashboardContext);
    if(dashboardContext === undefined) return; 
    const { totalCase } = dashboardContext;
    return (
        <div className="flex flex-1 px-5 py-4 sm:px-7.5 sm:py-5 items-end md:text-6xl text-3xl font-inter font-black gap-5 text-gray-700">
            <div>{totalCase}</div><div className="font-poppins text-xs font-normal relative top-[-3px]">total records</div>
        </div>
    )
}
export default TotalRecord;