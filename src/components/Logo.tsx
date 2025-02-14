import Bus from "@/components/Bus";
const Logo: React.FC = () => {
  return (
    <div className="flex gap-5 items-center">
      <div className="size-12 rounded-2xl bg-radial-[at_25%_25%] from-white to-gray-900 to-75% shadow-xl shadow-gray-900/30 flex items-center justify-center text-white">
        <Bus fill={"#ffffff"} />
      </div>
      <div className="font-inter font-bold text-2xl bg-radial-[at_1%_1%] from-white to-gray-950 to-55% text-transparent bg-clip-text">
        VeeManage
      </div>
    </div>
  );
};

export default Logo;
