import {  TableColumnsType, TableProps } from "antd";
import { AllVehicleProps, AllVehicleResponse, AllVehicleDataProps, AllVehicleResultTripProps, approval_status, vehicle_status, vehicle_type, AllVehiceFilterParams } from "@/types/AllVehicle.type";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, UserGroup02Icon } from "@hugeicons/core-free-icons";
import Location from "@/components/Location";
import VehicleStatus from "@/components/VehicleStatus";
import ApprovalStatus from "@/components/ApprovalStatus";
import VehicleType from "@/components/VehicleType";
import { fetchVehicle } from "@/api/services/Dashboard.service";
import { useEffect, useState } from "react";


export const useGetTableData = () => {
    const [data,setData] = useState<AllVehicleProps[]>([]);
    const [tableParams,setTableParams] = useState<AllVehiceFilterParams>({
      pagination:{
        "current":1,
        "pageSize":50,
        "total":undefined
      }
    });
    useEffect(()=>{
      const fetchData = async ()=>{
        const response:AllVehicleResponse = await fetchVehicle(tableParams);
        if(!response.data || response.message != "success") return;
        const allVehicleData: AllVehicleDataProps = response.data;
        
        const vehicleResult: AllVehicleProps[] = allVehicleData.result.map(
          ({ country_code, ctime, id,  ...rest }) => ({key:id,...rest})
        );
        setData(vehicleResult);
        setTableParams({
          ...tableParams,
          pagination:{
            ...tableParams.pagination,
            total:allVehicleData.pagination_info.total_records
          }
        })
      }
      fetchData();
    },[
      tableParams.pagination?.current,
      tableParams.pagination?.pageSize,
    ]);

    const handleTableChange:TableProps<AllVehicleProps>['onChange'] = (pagination, filters, sorter) =>{
      setTableParams({
        ...tableParams,
        pagination
      });
      // setTableParams({
      //   ...tableParams,
      //   "pagination": {
      //     ...pagination,
      //     current: pagination.current ?? 1, // Ensure 'current' is always defined
      //   },
      // });
    }
    const columns:TableColumnsType<AllVehicleProps> = [
        {
          title: "License Plate",
          dataIndex: "license_plate",
          key: "license_plate",
          render:(license_plate:number)=>{
            return (
              <b className="text-gray-600 font-inter text-sm">{license_plate}</b>
            )
          },
          fixed: 'left',
          sorter: { 
            multiple: 1
          },
        },
        {
          title: "Vehicle Owner",
          dataIndex: "vehicle_owner",
          key: "vehicle_owner",
          sorter: { 
            multiple: 1
          },
        },
        {
          title: "Vehicle Type",
          dataIndex: "vehicle_type",
          key: "vehicle_type",
          sorter: { 
            multiple: 1
          },
          render:(type:vehicle_type)=>{
            return <VehicleType type={type}/>
          }
        },
        {
          title: "Vehicle Status",
          dataIndex: "vehicle_status",
          key: "vehicle_status",
          sorter: { 
            multiple: 1
          },
          render:(status:vehicle_status)=>{
            return <VehicleStatus status={status}/>;
          }
        },
        {
          title: "Approval Status",
          dataIndex: "approval_status",
          key: "approval_status",
          sorter: { 
            multiple: 1
          },
          render:(status:approval_status)=>{
            return <ApprovalStatus status={status}/>
          }
        },
        {
          title: "Driver",
          dataIndex: "driver",
          key: "driver",
          sorter: { 
            multiple: 1
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
                  <Location color={'red'} borderColor={'red'} size={20} strokeWidth={1}/>
                  <span className="text-gray-800">{trips[0].from}</span>
                </div>
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={14}
                  color="gray"
                strokeWidth={.4}/>
                <div className="flex items-center gap-1">
                  <Location color={'red'} borderColor={'red'} size={20} strokeWidth={1}/>
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
            multiple: 1
          },
        },
        {
          title: "Passenger Capacity",
          dataIndex: "passenger_capacity",
          key: "passenger_capacity",
          sorter: { multiple: 1},
          render:(passenger_capacity:number)=>{
            return (
              <div className="text-gray-700 flex gap-x-1.5 items-center">
                <HugeiconsIcon  icon={UserGroup02Icon}
                  size={20}
                  color="currentcolor"
                strokeWidth={.1}/>
                <span>{passenger_capacity}</span>
              </div>
            )
          }
        },
        {
          title: "Last Updated Time",
          dataIndex: "mtime",
          key: "mtime",
          sorter: { 
            multiple: 1
          },
          render:(timestamp:number)=>{
            return timestamp && new Date(timestamp * 1000).toLocaleString();
          }
        },
      ];

      return { data, columns, tableParams, handleTableChange };
}