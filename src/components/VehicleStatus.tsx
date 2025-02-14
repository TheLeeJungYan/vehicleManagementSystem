import { vehicle_status } from "@/types/AllVehicle.type";
const vehicleStatus:React.FC<{status:vehicle_status}> = ({status}) => {
    return (
        <div className={`${status=="Active"?'bg-green-200/50 text-green-800':status=="Inactive"?'bg-gray-200/50 text-gray-600' :'bg-slate-200/50 text-gray-slate-600'} rounded-full px-2.5 py-1 text-xs w-fit font-inter font-normal flex gap-x-1.5 items-center`}>
            <span className={`${status == "Active"?'bg-green-600':status=="Inactive"?'bg-gray-400':'bg-slate-400'} w-1.5 h-1.5 rounded-full`}></span>
            <span>{status}</span>
        </div>
    )
}

export default vehicleStatus;