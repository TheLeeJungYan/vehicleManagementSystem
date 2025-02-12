import { CardProps } from "@/types/Card.type";
const Card: React.FC<CardProps> = ({ title, value, main, icon }) => {
  console.log(title);
  const getIconClass: (title: string) => string = (title) => {
    if (title == "draft") return "bg-white/30 ring-white/10";
    if (title == "pending information")
      return "bg-orange-400/10 text-orange-400";
    if (title == "rejected") return "bg-rose-400/10 text-rose-400";
    return "";
  };
  return (
    <div
      className={`flex-1 flex flex-col p-2 rounded-xl capitalize relative overflow-hidden ${
        main
          ? "bg-radial-[at_95%_5%]  from-gray-200 to-gray-950 to-90% text-white shadow-md"
          : "bg-black/5 outline outline-white/15 backdrop-blur-md"
      }`}
    >
      <div
        className={`flex flex-1 flex-col px-7.5 py-5 rounded-lg ${
          !main && "bg-white"
        }`}
      >
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconClass(
            title
          )}`}
        >
          {icon}
        </div>
        <div className="flex mt-3">
          <span className="text-6xl font-bold">{value}</span>
        </div>
        <div className="ml-1 mt-1 items-center flex gap-2">
          <div className="rounded-full w-2 h-2 bg-white ring-1"></div>
          <span className="text-xs font-poppins text-gray-400">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
