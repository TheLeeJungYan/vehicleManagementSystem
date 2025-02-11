import { CardProps } from "@/types/Card.type";
import { HugeiconsIcon } from '@hugeicons/react';
const Card:React.FC<CardProps> = ({title,value,main}) => {
    return (
        <div className={`flex-1 flex flex-col py-10 px-10 rounded-2xl capitalize ${main?'bg-linear-60 from-cyan-700 to-white text-white':'bg-gray-100 text-gray-800'}`}>
            <div className="flex">
                <span className="text-6xl font-bold">{value}</span>
                <div className={`${main?'':''}`}>
                        </div>
            </div>
            <div className="flex items-center gap-4 mt-1 ml-1">
                <span className={`font-poppins text-sm ${main?'text-gray-50':'text-gray-400'}`}>{title}</span>
            </div>
        </div>
    )
}

export default Card;