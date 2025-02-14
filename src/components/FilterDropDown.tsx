import { Button, Tooltip, Select, InputNumber, InputNumberProps } from "antd";
import { HugeiconsIcon } from "@hugeicons/react";
import { FilterIcon } from "@hugeicons/core-free-icons";
import { useState, useRef, useEffect, useContext } from "react";
import FilterGroup from "./FilterGroup";
import { DashboardContext } from "@/context/DashboardContext";
import { vehicleTypesOptions,approvalStatusesOptions, vehicleStatusOptions} from "@/data/Option";
import { approvalStatusesValueType, vehicleStatusValueType } from "@/types/Option.type";
import { vehicle_type } from "@/types/AllVehicle.type";
const FilterDropDown = () => {
  const dashboardContext = useContext(DashboardContext)
  if(dashboardContext === undefined) return;
  const { 
    loading, 
    approvalStatus,
    setApprovalStatus,
    minPassenger,
    setMinPassenger,
    maxPassenger,
    setMaxPassenger,
    vehicleType,
    setVehicleType,
    vehicleStatus,
    setVehicleStatus,
    filter 
  } = dashboardContext;
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".ant-select-dropdown")
      ) {
        setOpen(false);
      }
    }
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const convertToNumeric:(value:any)=>number = (value)=>{
    return typeof value === "number" ? value : Number(value);
  }

  const approvalStatusHandleChange = (value:approvalStatusesValueType) => {
    setApprovalStatus(value);
  };

  const maxPassengerOnChange: InputNumberProps['onChange'] = (value) => {
    setMaxPassenger(convertToNumeric(value) || 1); 
  };

  const minPassengerOnChange: InputNumberProps['onChange'] = (value) => {
    setMinPassenger(convertToNumeric(value) || 1); 
  };
  
  const vehicleTypeHandleChange = (value:vehicle_type)=>{
    setVehicleType(value)
  }

  
  const vehicleStatusHandleChange = (value:vehicleStatusValueType)=>{
    setVehicleStatus(value);
  }

  return (
    <div className="relative" >
      <Tooltip title="Filter">
        <Button
          type="default"
          className=""
          onClick={() => setOpen((prev) => !prev)}
          icon={
            <HugeiconsIcon
              icon={FilterIcon}
              size={14}
              color="gray"
              strokeWidth={0.1}
            />
          }
          disabled={loading}
        ></Button>
      </Tooltip>
      {(open && !loading) && (
        <>
        <div className="fixed md:hidden z-[100] top-0 right-0 w-full h-full bg-black/20"></div>
        <div
          className="fixed top-0 right-0 h-full w-[400px] md:w-auto z-[200] md:h-auto md:absolute md:top-full  max-w-screen sm:min-w-[450px] md:min-w-[600px] lg:min-w-[800px] border border-gray-200 md:rounded-lg bg-white md:mt-1 flex flex-col shadow-2xl"
          ref={dropdownRef} onClick={(e) => e.stopPropagation()}
        >
          <div className="py-2.5 px-4 border-b border-gray-200 flex items-center gap-x-2 ">
            <div className="flex gap-x-2 bg-gray-50 w-7 h-7 text-gray-700 border-gray-200 items-center justify-center rounded-md border">
              <HugeiconsIcon
                icon={FilterIcon}
                size={14}
                color="currentcolor"
                strokeWidth={0.1}
              />
            </div>
            <span>Filter</span>
          </div>
          <div className="flex-1 py-2.5 px-4 bg-gray-50 flex flex-col gap-y-2">

            <div className="flex *:flex-1 flex-col md:flex-row lg:gap-x-5 md:gap-2 gap-y-2">
                <FilterGroup label="Approval Status">
                  <Select
                    showSearch
                    placeholder="select a approval status"
                    optionFilterProp="label"
                    value={approvalStatus}
                    style={{ width: "100%" }}
                    options={approvalStatusesOptions}
                    onChange={approvalStatusHandleChange}
                  />
                </FilterGroup>
                <FilterGroup label="Passenger Capacity">
                  <div className="flex lg:gap-x-5 gap-1 xs:flex-row flex-col">
                    <InputNumber
                      addonBefore="min"
                      min={1}
                      max={maxPassenger??''}
                      defaultValue={"-"}
                      value={minPassenger??''}
                      style={{ width: "100%" }}
                      onChange={minPassengerOnChange}
                    />
                    <InputNumber
                      addonBefore="max"
                      min={minPassenger??''}
                      defaultValue={"-"}
                      value={maxPassenger??''}
                      style={{ width: "100%" }}
                      onChange={maxPassengerOnChange}
                    />
                  </div>
                </FilterGroup>
            </div>

            <div className="flex *:flex-1 flex-col md:flex-row lg:gap-x-5 md:gap-2 gap-y-2">
              <FilterGroup label="Vehicle Type">
                <Select
                    showSearch
                    placeholder="select a vehicle type"
                    optionFilterProp="label"
                    style={{ width: "100%" }}
                    options={vehicleTypesOptions}
                    value={vehicleType}
                    onChange={vehicleTypeHandleChange}
                  />
              </FilterGroup>
              <FilterGroup label="Vehicle Status">
                <Select
                  showSearch
                  placeholder="select a vehicle status"
                  optionFilterProp="label"
                  style={{ width: "100%" }}
                  options={vehicleStatusOptions}
                  value={vehicleStatus}
                  onChange={vehicleStatusHandleChange}/>
              </FilterGroup>
             
            </div>
          </div>
          <footer className="mt-auto border-t border-gray-200 py-2 gap-x-1  flex justify-end px-4">
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button color="primary" variant="solid" disabled={loading} onClick={()=>{
              filter();
              setOpen(false);
            }}>
              Apply
            </Button>
          </footer>
        </div>
        </>
      )}
    </div>
  );
};

export default FilterDropDown;
