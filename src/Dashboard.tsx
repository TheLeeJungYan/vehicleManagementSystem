import Layout from "@/components/Layout";
import { useGetData } from "@/hooks/useGetData";
import Card from "@/components/Card";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  LicenseDraftIcon,
  Loading03Icon,
  UnavailableIcon,
} from "@hugeicons/core-free-icons";
import DashboardProvider from "@/context/DashboardContext";
import TableContainer from "@/components/TableContainer";
import TotalRecord from "./components/TotalRecord";
const Dashboard: React.FC = () => {
  const { totalRejected, totalPending, totalDraft } =
    useGetData();
  return (
    <DashboardProvider>
      <Layout>
        <div className="flex flex-col ">
          <h1 className="text-3xl font-montserrat font-medium text-gray-800">
            Dashboard
          </h1>
          <span className="font-poppins text-xs text-gray-400">
            Monitor and manage your fleet with real-time insights, vehicle
            tracking, and performance analytics
          </span>
        </div>
        <div className="flex">
          <div className="flex flex-1 2xl:gap-x-10 l xl:gap-x-5 md:gap-5 flex-col xl:flex-row gap-3   *:flex *:flex-1 *:2xl:gap-x-10 *:xl:gap-x-5 *:md:gap-5 *:flex-col *:md:flex-row *:gap-3">
            <div>
              <TotalRecord/>
              <Card
                title={"draft"}
                value={totalDraft}
                main={true}
                icon={
                  <HugeiconsIcon
                    icon={LicenseDraftIcon}
                    size={20}
                    color="currentColor"
                    strokeWidth={1}
                  />
                }
              />
            </div>
            
            <div>
              <Card
                title={"pending information"}
                value={totalPending}
                main={false}
                icon={
                  <HugeiconsIcon
                    icon={Loading03Icon}
                    size={20}
                    color="currentColor"
                    strokeWidth={1}
                  />
                }
              />
              <Card
                title={"rejected"}
                value={totalRejected}
                main={false}
                icon={
                  <HugeiconsIcon
                    icon={UnavailableIcon}
                    size={20}
                    color="currentColor"
                    strokeWidth={1}
                  />
                }
              />
            </div>
           
          </div>
        </div>
        <TableContainer/>
      </Layout>
    </DashboardProvider>
  );
};

export default Dashboard;
