import { DataGrid } from '@mui/x-data-grid';
import "../sass/datatable.scss";

export default function DataTable({data}) {
  

  const columns = [
    { field: 'rank', headerName: 'Rank', type: 'number', flex: 1, headerAlign: 'center', align: 'center', headerClassName: 'header' },
    { field: 'user_name', headerName: 'Username', flex: 3, headerAlign: 'center', align: 'center', headerClassName: 'header' },
    { field: 'wins', headerName: 'Total wins', type: 'number', flex: 1, headerAlign: 'center', align: 'center', headerClassName: 'header' },
  ];
  
  const rows = data;



  return (
    <div style={{ height: 400, backgroundColor: '#aaa', borderRadius: '10px', width: '70%' }}>
      <DataGrid
        rows={rows}
        getRowId={(row) => row.user_name}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        sx={{border: 2, borderColor: 'primary.main', borderRadius: '10px'}}
      />
    </div>
  );
}
