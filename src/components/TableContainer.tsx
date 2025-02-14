import { Table } from "antd";
import { Input } from "antd";
import { useGetTableData } from "@/hooks/useGetTableData";
import { DatePicker } from "antd";
import FilterDropDown from "@/components/FilterDropDown";
const { Search } = Input;
const { RangePicker } = DatePicker;
const TableContainer: React.FC = () => {
  const {
    data,
    columns,
    tableParams,
    loading,
    dateFormat,
    handleTableChange,
    onSearch,
    dateOnChange,
  } = useGetTableData();

  return (
    <div className="flex-1 flex flex-col relative">
      <div className="flex mb-2 gap-2">
        <Search
          placeholder="search license plate..."
          onSearch={onSearch}
          style={{ width: 400, height: 10 }}
          loading={loading}
        />
        <RangePicker
          format={dateFormat}
          onChange={dateOnChange}
          disabled={[loading, loading]}
          allowEmpty={true}
        />
        <div className="ml-auto">
          <FilterDropDown />
        </div>
      </div>
      {/* <div className="absolute top-0 left-0 bg-gray-500 w-full h-full"></div> */}
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
