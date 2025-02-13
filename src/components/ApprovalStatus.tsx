import { approval_status } from "@/types/AllVehicle.type";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  LicenseDraftIcon,
  Loading03Icon,
  UnavailableIcon,
  CheckmarkCircle01Icon
} from "@hugeicons/core-free-icons";
const ApprovalStatus:React.FC<{status:approval_status}> = ({status})=>{

    const statusClass = {
        Draft : "bg-gray-100 border-gray-200 text-gray-500",
        Pending: "bg-orange-50 text-orange-500 border-orange-200",
        Rejected: "bg-rose-50 text-rose-500 border-rose-200",
        Approved: "bg-emerald-50 text-emerald-500 border-emerald-200",
    }[status];

    const statusIcon = {
        Draft : <HugeiconsIcon icon={LicenseDraftIcon} size={12} color="currentcolor" strokeWidth={.4}/>,
        Pending: <HugeiconsIcon icon={Loading03Icon} size={12} color="currentcolor" strokeWidth={.4}/>,
        Rejected: <HugeiconsIcon icon={UnavailableIcon} size={12} color="currentcolor" strokeWidth={.4}/>,
        Approved: <HugeiconsIcon icon={CheckmarkCircle01Icon} size={12} color="currentcolor" strokeWidth={.4}/>,
    }[status];

    return (
        <div className={`${statusClass} border font-inter rounded-lg px-2 py-1 text-xs w-fit flex items-center gap-x-1.5`}>
            {statusIcon}
            <span>{status}</span>
        </div>
    )
}

export default ApprovalStatus;