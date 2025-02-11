import Header from "@/components/Header";
const Layout:React.FC<{children:React.ReactNode}> = ({children}) => {
    return (
        <div className="min-h-screen min-w-screen flex flex-col py-4 px-8 relative">
            <div className="absolute inset-0 -z-10 h-full w-full bg-gray-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <Header/>
            {children}
        </div>
    )
}

export default Layout;