import logo from "@/assets/bus.png";
const Logo: React.FC = () => {
  return (
    <div className="flex font-inter gap-5 items-center font-bold text-2xl">
      <div className="size-16 py-2 px-3 rounded-2xl bg-gray-100 border flex items-center justify-center text-white">
        <img src={logo} alt="" className="object-contain h-14" />
      </div>
      <span className="">
        <span className="">Vee</span>
        Manage
      </span>
    </div>
  );
};

export default Logo;
