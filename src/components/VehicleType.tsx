import { vehicle_type } from "@/types/AllVehicle.type";
const VehicleType:React.FC<{type:vehicle_type}> = ({type}) => {
    if(type == undefined){
        return;
    }
    const imageSrc = new URL(`../img/${type.toLowerCase()}.png`, import.meta.url).href;

    return (
        <div className="flex gap-x-2">
            {imageSrc && <img src={imageSrc} className="w-6 h-6 object-contain" loading="lazy" alt="Icon made by Adib Sulthon from www.flaticon.com"/>}
            <span>{type}</span>
        </div>
    )
}

export default VehicleType;