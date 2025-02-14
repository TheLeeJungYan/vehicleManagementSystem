import { TableColumnsType, TableProps } from "antd";
import {
  AllVehicleProps,
  AllVehicleResultTripProps,
  approval_status,
  vehicle_status,
  vehicle_type,
  AllVehicleFilterParams,
  AllVehicleFilterParamsSortBy,
} from "@/types/AllVehicle.type";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, UserGroup02Icon } from "@hugeicons/core-free-icons";
import Location from "@/components/Location";
import VehicleStatus from "@/components/VehicleStatus";
import ApprovalStatus from "@/components/ApprovalStatus";
import VehicleType from "@/components/VehicleType";
import type { GetProps } from "antd";
import { Input } from "antd";
import { useContext } from "react";
import { Dayjs } from "dayjs";
import { DashboardContext } from "@/context/DashboardContext";

type SearchProps = GetProps<typeof Input.Search>;

export const useGetTableData: () => {
  data: AllVehicleProps[];
  columns: TableColumnsType<AllVehicleProps>;
  tableParams: AllVehicleFilterParams;
  loading: boolean;
  dateFormat: string;
  handleTableChange: TableProps<AllVehicleProps>["onChange"];
  onSearch: SearchProps["onSearch"];
  dateOnChange: (
    date: Dayjs | (Dayjs | null)[] | null,
    dateString: string | string[]
  ) => void;
  clearFilter:()=>void
}|null = () => {

  const dashboardContext = useContext(DashboardContext);
  if (dashboardContext == undefined)   if (!dashboardContext) return null;

  const { setTableParams, tableParams, data, loading, clearFilter } = dashboardContext;
  const dateFormat: string = "YYYY/MM/DD";

  const onSearch: SearchProps["onSearch"] = (value, _e) => {
    setTableParams((prev) => {
      const updatedParams = { ...prev };

      if (value.trim() === "") {
        delete updatedParams.license_plate; // Remove the key if empty
      } else {
        updatedParams.license_plate = value.toUpperCase();
      }

      return updatedParams;
    });
  };

  const dateOnChange = (
    date: Dayjs | (Dayjs | null)[] | null
  ) => {
    if (date === null) {
      setTableParams(({ mtime_from, mtime_to, ...prev }) => ({
        ...prev,
      }));
    }
    if (Array.isArray(date)) {
      if (date[0] && date[1]) {
        const mtime_from = date[0].unix();
        const mtime_to = date[1].endOf("day").unix();
        setTableParams((prev) => ({
          ...prev,
          mtime_from,
          mtime_to,
        }));
        return;
      }
    }
  };

  const handleTableChange: TableProps<AllVehicleProps>["onChange"] = (
    pagination,
    _filters,
    sorter
  ) => {
    const normalizedSorter = Array.isArray(sorter) ? sorter : [sorter];
    const sortParams: AllVehicleFilterParamsSortBy[] = normalizedSorter
      .filter((s) => s.order)
      .map((s) => ({
        field: String(s.columnKey || ""),
        order_type: s.order === "ascend" ? 0 : 1,
      }));
    setTableParams({
      ...tableParams,
      pagination,
      sort_by: sortParams,
    });
  };

  const columns: TableColumnsType<AllVehicleProps> = [
    {
      title: "License Plate",
      dataIndex: "license_plate",
      key: "license_plate",
      render: (license_plate: number) => {
        return (
          <b className="text-gray-600 font-inter text-sm">{license_plate}</b>
        );
      },
      fixed: "left",
      sorter: {
        multiple: 1,
      },
    },
    {
      title: "Vehicle Owner",
      dataIndex: "vehicle_owner",
      key: "vehicle_owner",
      sorter: {
        multiple: 1,
      },
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicle_type",
      key: "vehicle_type",
      sorter: {
        multiple: 1,
      },
      render: (type: vehicle_type) => {
        return <VehicleType type={type} />;
      },
    },
    {
      title: "Vehicle Status",
      dataIndex: "vehicle_status",
      key: "vehicle_status",
      sorter: {
        multiple: 1,
      },
      render: (status: vehicle_status) => {
        return <VehicleStatus status={status} />;
      },
    },
    {
      title: "Approval Status",
      dataIndex: "approval_status",
      key: "approval_status",
      sorter: {
        multiple: 1,
      },
      render: (status: approval_status) => {
        return <ApprovalStatus status={status} />;
      },
    },
    {
      title: "Driver",
      dataIndex: "driver",
      key: "driver",
      sorter: {
        multiple: 1,
      },
    },
    {
      title: "Trips",
      dataIndex: "trips",
      key: "trips",
      render: (trips: AllVehicleResultTripProps[] | []) => {
        return trips.length ? (
          <div className="flex items-center space-x-1">
            <div className="flex items-center gap-1">
              <Location
                color={"red"}
                borderColor={"red"}
                size={20}
                strokeWidth={1}
              />
              <span className="text-gray-800">{trips[0].from}</span>
            </div>
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={14}
              color="gray"
              strokeWidth={0.4}
            />
            <div className="flex items-center gap-1">
              <Location
                color={"red"}
                borderColor={"red"}
                size={20}
                strokeWidth={1}
              />
              <span>{trips[0].to}</span>
            </div>
          </div>
        ) : null;
      },
    },
    {
      title: "Contact Number",
      dataIndex: "contact_number",
      key: "contact_number",
      sorter: {
        multiple: 1,
      },
    },
    {
      title: "Passenger Capacity",
      dataIndex: "passenger_capacity",
      key: "passenger_capacity",
      sorter: { multiple: 1 },
      render: (passenger_capacity: number) => {
        return (
          <div className="text-gray-700 flex gap-x-1.5 items-center">
            <HugeiconsIcon
              icon={UserGroup02Icon}
              size={20}
              color="currentcolor"
              strokeWidth={0.1}
            />
            <span>{passenger_capacity}</span>
          </div>
        );
      },
    },
    {
      title: "Last Updated Time",
      dataIndex: "mtime",
      key: "mtime",
      sorter: {
        multiple: 1,
      },
      defaultSortOrder: "descend",
      render: (timestamp: number) => {
        return (
          timestamp &&
          new Date(timestamp * 1000).toLocaleString("en-MY", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
            timeZone: "Asia/Kuala_Lumpur",
          })
        );
      },
    },
  ];

  return {
    data,
    columns,
    tableParams,
    loading,
    dateFormat,
    handleTableChange,
    onSearch,
    dateOnChange,
    clearFilter
  };
};
