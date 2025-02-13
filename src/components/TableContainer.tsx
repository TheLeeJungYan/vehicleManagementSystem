import { Table } from "antd";
import { TableContainerProps } from "@/types/Table.type";
import { AllVehicleResultTripProps } from "@/types/AllVehicle.type";
const TableContainer: React.FC<TableContainerProps> = ({ data }) => {
  console.log(data);

  const columns = [
    {
      title: "License Plate",
      dataIndex: "license_plate",
      key: "license_plate",
    },
    {
      title: "Vehicle Owner",
      dataIndex: "vehicle_owner",
      key: "vehicle_owner",
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicle_type",
      key: "vehicle_type",
    },
    {
      title: "Vehicle Status",
      dataIndex: "vehicle_status",
      key: "vehicle_status",
    },
    {
      title: "Approval Status",
      dataIndex: "approval_status",
      key: "approval_status",
    },
    {
      title: "Driver",
      dataIndex: "driver",
      key: "driver",
    },
    {
      title: "Trips",
      dataIndex: "trips",
      key: "trips",
      render: (trips: AllVehicleResultTripProps[] | []) => {
        return trips.length && `${trips[0].from} - ${trips[0].to}`;
      },
    },
    {
      title: "Contact Number",
      dataIndex: "contact_number",
      key: "contact_number",
    },
    {
      title: "Passenger Capacity",
      dataIndex: "passenger_capacity",
      key: "passenger_capacity",
    },
    {
      title: "Last Updated Time",
      dataIndex: "mtime",
      key: "mtime",
    },
  ];
  return (
    <div className="flex-1 flex flex-col">
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default TableContainer;
