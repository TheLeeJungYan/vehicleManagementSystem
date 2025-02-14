import { Button, Table } from "antd";
import { Input } from "antd";
import { useGetTableData } from "@/hooks/useGetTableData";
import { DatePicker } from "antd";
import FilterDropDown from "@/components/FilterDropDown";
import { FilterRemoveIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
const { Search } = Input;
const { RangePicker } = DatePicker;
const TableContainer: React.FC = () => {
  const getTableData = useGetTableData();
  if(!getTableData) return;
  const {
    data,
    columns,
    tableParams,
    loading,
    dateFormat,
    handleTableChange,
    onSearch,
    dateOnChange,
    clearFilter
  } = getTableData;

  return (
    <div className="flex-1 flex flex-col relative">
      <div className="flex mb-2 gap-2 flex-col md:flex-row-reverse">
      <div className="ml-auto flex gap-x-2">
          <Button 
            variant="solid"
            color="default"
            style={{'alignItems':'center'}}
            icon={
              <HugeiconsIcon  icon={FilterRemoveIcon} size={16} color="currentcolor" />
            }
            onClick={()=>clearFilter()}
            loading={loading}
          >Clear Filter</Button>
          <FilterDropDown />
        </div>
        <div className="flex gap-2 flex-col sm:flex-row">
          <Search
            placeholder="search license plate..."
            onSearch={onSearch}
            style={{ width: "100%" }}
            loading={loading}
          />
          <RangePicker
            format={dateFormat}
            onChange={dateOnChange}
            disabled={[loading, loading]}
            style={{ width: "100%" }}
            allowEmpty={true}
          />
        </div>
        
        
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        scroll={{ x: "max-content" }}
        loading={loading}
      />
    </div>
  );
};

export default TableContainer;
