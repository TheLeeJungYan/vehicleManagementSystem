import { Button, Flex, Tooltip, Card, Select, InputNumber } from "antd";
import { HugeiconsIcon } from "@hugeicons/react";
import { FilterIcon } from "@hugeicons/core-free-icons";
import { useState, useRef, useEffect } from "react";
const FilterDropDown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative">
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
        ></Button>
      </Tooltip>
      {open && (
        <div
          className="absolute top-full right-0 z-100 min-w-[400px] lg:min-w-[600px] border border-gray-200 rounded-lg bg-white mt-1 flex flex-col shadow-2xl"
          ref={dropdownRef}
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
          <div className="flex-1 py-2.5 px-4 bg-gray-50 flex flex-col gap-y-3">
            <div className="flex *:flex-1 gap-x-5">
              <div>
                <label className="text-gray-500 text-xs ml-1 font-poppins">
                  Approval Status
                </label>
                <Select
                  showSearch
                  placeholder="select a vehicle type"
                  optionFilterProp="label"
                  style={{ width: "100%" }}
                  options={[
                    {
                      value: "jack",
                      label: "Jack",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "tom",
                      label: "Tom",
                    },
                  ]}
                />
              </div>
              <div>
                <label className="text-gray-500 text-xs ml-1 font-poppins">
                  Passenger Capacity
                </label>
                <div className="flex gap-x-2">
                  <InputNumber
                    addonBefore="min"
                    min={1}
                    defaultValue={1}
                    style={{ width: "100%" }}
                  />
                  <InputNumber
                    addonBefore="max"
                    min={1}
                    defaultValue={5}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>

            <div className="flex *:flex-1 gap-x-5">
              <div>
                <label className="text-gray-500 text-xs ml-1 font-poppins">
                  vehicle status
                </label>
                <Select
                  showSearch
                  placeholder="select a approval type"
                  optionFilterProp="label"
                  style={{ width: "100%" }}
                  options={[
                    {
                      value: "jack",
                      label: "Jack",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "tom",
                      label: "Tom",
                    },
                  ]}
                />
              </div>
              <div>
                <label className="text-gray-500 text-xs ml-1 font-poppins">
                  vehicle type
                </label>
                <Select
                  showSearch
                  placeholder="select a vehicle type"
                  optionFilterProp="label"
                  style={{ width: "100%" }}
                  options={[
                    {
                      value: "jack",
                      label: "Jack",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "tom",
                      label: "Tom",
                    },
                  ]}
                />
              </div>
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
            <Button color="primary" variant="solid">
              Apply
            </Button>
          </footer>
        </div>
      )}
    </div>
  );
};

export default FilterDropDown;
