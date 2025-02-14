import Header from "@/components/Header";
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col px-8 md:px-16 xs:px-12 xl:px-20 py-10">
      <div className="fixed left-0 top-0 -z-10 h-full w-full">
        <div className="relative h-full w-full bg-white">
          <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>
      </div>

      <Header />
      <div className="flex flex-1 flex-col py-10 gap-10">{children}</div>
    </div>
  );
};

export default Layout;
