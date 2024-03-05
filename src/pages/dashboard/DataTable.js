/*eslint-disable */
import React ,{ useState,useEffect,useContext} from "react"
import { DataGrid } from '@mui/x-data-grid'
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from "@mui/material";
import LoadingPanel from "components/ReusableComponents/LoadingPanel";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { tableDataContext, tableloadingContext,nextContext } from "context/DropDownContext";
import { makeStyles } from '@mui/styles';
import api from "api/api";
const headCells = [
   
    {
    field: 'id',
      align: 'left',
      disablePadding: false,
      headerName: 'Certicate ID',
      flex:1,
      minWidth:100,
   
      headerAlign: 'center',
   
    },
    {
         field: 'client_name',
      align: 'left',
      disablePadding: true,
      headerName: 'Institute',
      flex:1,
      minWidth:150
    },
    {
        field: 'dept_name',
      align: 'right',
      disablePadding: false,
      headerName: 'Course',
      flex:1,
    },
    {
        field: 'degree',
      align: 'left',
      disablePadding: false,
  
      headerName: 'Degree'
    },
    {
        field: 'semister',
      align: 'right',
      disablePadding: false,
      headerName: 'Semister'
    },
    // {
    //     field: 'student_id',
    //   align: 'right',
    //   disablePadding: false,
    //   headerName: 'Student ID'
    // },
    {
        field: 'student_name',
      align: 'right',
      disablePadding: false,
      headerName: 'Student name'
    },
    {
        field: 'certi_type',
      align: 'right',
      disablePadding: false,
      headerName: 'Certificate Type'
    },
   
  
   
    {
        field: 'completed_date',
      align: 'right',
      disablePadding: false,
      headerName: 'Completed on'
    },
    {
        field: 'grade',
      align: 'right',
      disablePadding: false,
      headerName: 'Grade'
    },
    {
        field: 'issued_date',
      align: 'right',
      disablePadding: false,
      headerName: 'Issued date',
      renderCell:(val)=>{
        return dayjs(val.value).format("YYYY/MM/DD ")
      }
    },
    {
        field: 'expiration_date',
      align: 'right',
      disablePadding: false,
      headerName: 'Valid Till',
    
    },
  ];



//   headerName:'Incident ID',
//   headerClassName:"header",
 
//   flex: 1,
//   minWidth: 150,
//   // ,width:120
//   },
//   {
//     field:'name',headerName:"Name",
//     flex:1,
//     // ,width:150
//   },
//   // { field: 'incident_id', headerName: 'IncidentID', width: 90 },
//   {
//     field: 'status',
//     headerName: 'Status',
//     flex:1,
//     minWidth: 50,
//     // width: 150,
 
//   },
//   {
//     field:"created_datetime",
//     headerName:' Created Date',
//     flex:1,
//     // width:150,
//     renderCell:(val)=>{
//       return dayjs(val.value).format("YYYY/MM/DD hh:mm:ss A")
//     }
//   },
 
// ];
const useStyles = makeStyles({
  customHeader: {
    backgroundColor: 'blue', // Change the background color
    color: 'white', // Change the text color
    fontWeight: 'bold', 
    fontSize:"20px"// Apply bold font weight
  },
});
const DataTable = () =>{
const {tabledata, setTabledata} = useContext(tableDataContext)
const {tableLoading,setTableLoading} = useContext(tableloadingContext)
const classes = useStyles();
const [ page , setPage] = useState(1)
  const [ selectedRow ,setSelectedRow] = useState({})
const { nextApi,setNextApi} = useContext(nextContext)
const [paginationModel, setPaginationModel] = useState({
  pageSize: nextApi.pageSize,
  page: nextApi.page-1,
  totalRows:nextApi.totalRows
});
useEffect(()=>{
if(nextApi?.reset)
{
  setPaginationModel({pageSize: nextApi.pageSize,
    page: nextApi.page-1,
    totalRows:nextApi.totalRows})

}
return undefined;
},[nextApi?.reset])
useEffect(()=>{
 
  setNextApi({...nextApi,"pageSize":paginationModel.pageSize,"page":paginationModel.page+1,"reset":false})
},[paginationModel])
  const handleRowClick = (e) =>{
   setSelectedRow(e)
  }
  const handlePostMortem =()=>{
   alert(selectedRow.id)
  }
  const handleDelete =()=>{
    alert(selectedRow.id)
  }
  const handlePaginationChange=(e)=>{
    console.log(e)
     setPaginationModel({...nextApi,"pageSize":e.pageSize,"page":e.page})
   
  }
    return <><div >
   
      <Box sx={{ width: '100%',  position: 'relative'}}>
      {/* <div style={{ height: "100%", width: '100%', position: 'relative' }}> */}
      {tableLoading && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <CircularProgress />
        </div>
      )}
      <DataGrid  columns={headCells} rows={tabledata} 
   autoHeight={true}
          rowCount={nextApi?.totalRows}
          
          pagination
   
        pageSizeOptions={[5, 10, 25,50]}
   
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={handlePaginationChange}
       
      />
    {/* </div> */}
      
        </Box>
    </div>
    </>
}
export default DataTable;