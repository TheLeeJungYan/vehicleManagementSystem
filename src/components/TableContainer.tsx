import { Table } from "antd";
import { useGetTableData } from "@/hooks/useGetTableData";
const TableContainer: React.FC = () => {

  const { data, columns, tableParams, handleTableChange } = useGetTableData();
  return (
    <div className="flex-1 flex flex-col">
      <Table 
        dataSource={data} 
        columns={columns} 
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default TableContainer;
