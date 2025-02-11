import Layout from "@/components/Layout";
import { useGetData } from "./hooks/useGetData";
import Card from "./components/Card";
const Dashboard:React.FC  = () => {
    const {totalRejected,totalPending,totalDraft} = useGetData();
    return (
        <Layout>
            <div className="flex flex-col ">
                <h1 className="text-3xl font-montserrat font-medium text-gray-800">Dashboard</h1>
                <span className="font-poppins text-xs text-gray-400">Monitor and manage your fleet with real-time insights, vehicle tracking, and performance analytics</span>
            </div>
            <div className="flex gap-10">
                
                <Card title={'draft'} value={totalDraft} main={true}/>
                <Card title={'pending information'} value={totalPending} main={false}/>
                <Card title={'rejected'} value={totalRejected} main={false}/>
            </div>
        </Layout>
    )
}

export default Dashboard;