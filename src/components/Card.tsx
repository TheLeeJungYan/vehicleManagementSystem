import { CardProps } from "@/types/Card.type";
import { useContext } from "react";
import { DashboardContext } from "@/context/DashboardContext";
import { SelectedCardType } from "@/types/Dashboard.type";
const Card: React.FC<CardProps> = ({ title, value, main, icon }) => {
  const dashboardContext = useContext(DashboardContext);
  if(dashboardContext == undefined) return;
  if(value == 0) return;
  const { selectedCard, setSelectedCard } =dashboardContext;
  const getIconClass: (title: SelectedCardType) => string = (title) => {
    if (title == "draft") return "bg-white/30 ring-white/10";
    if (title == "pending information")
      return "bg-orange-400/10 text-orange-400";
    if (title == "rejected") return "bg-rose-400/10 text-rose-400";
    return "";
  };
  return (
    
    
      <div
        className={`flex-1 flex flex-col capitalize px-7.5 py-5 rounded-xl relative transition-all duration-300 ${
            main
              ? "bg-radial-[at_95%_5%]  from-gray-200 to-gray-950 to-90% text-white shadow-gray-800"
              : "border border-gray-200 bg-white shadow-gray-900/20 text-gray-800"
          } ${selectedCard == title && 'ring-4 ring-gray-950/5'}`}
          
      >
       
        <button className={`${selectedCard == title? main ? 'bg-white border-gray-800 ring ring-inset ring-inset-800 text-gray-800': 'bg-gray-800 border-gray-800 text-white':'bg-white border-gray-200 text-gray-600'} px-4 py-2 border  rounded-lg transition-all duration-300 text-sm font-inter absolute top-3 right-3 pointer capitalize cursor-pointer`} onClick={()=>setSelectedCard(title)}>
            view
        </button>
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconClass(
            title
          )}`}
        >
          {icon}
        </div>
        <div className="flex mt-3">
          <span className={`text-6xl font-bold ${main && 'animate-pulse-2'}`}>{value}</span>
        </div>
        <div className="ml-1 mt-1 items-center flex gap-2">
          <div className="rounded-full w-2 h-2 bg-gray-200 "></div>
          <span className="text-xs font-poppins text-gray-400">{title}</span>
        </div>
      </div>
  );
};

export default Card;
