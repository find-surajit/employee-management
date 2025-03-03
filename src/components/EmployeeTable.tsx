import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community"; // Import ColDef
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface Employee {
  name: string;
  email: string;
  phone?: string;
  role: string;
  joiningDate: string;
}

const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees");
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    }
  }, []);

  // ✅ Fix: Explicitly define columnDefs type as ColDef<Employee>[]
  const columnDefs: ColDef<Employee>[] = [
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "Phone", field: "phone", sortable: true, filter: true },
    { headerName: "Role", field: "role", sortable: true, filter: true },
    { headerName: "Joining Date", field: "joiningDate", sortable: true, filter: true },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "80%", margin: "auto" }}>
      <AgGridReact<Employee>
        rowData={employees}
        columnDefs={columnDefs}
        pagination={true}
      />
    </div>
  );
};

export default EmployeeTable;
