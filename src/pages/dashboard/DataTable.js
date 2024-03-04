/*eslint-disable */
import React ,{ useState,useEffect,useContext} from "react"
import { DataGrid } from '@mui/x-data-grid'
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from "@mui/material";
import LoadingPanel from "components/ReusableComponents/LoadingPanel";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { tableDataContext, tableloadingContext } from "context/DropDownContext";
import { makeStyles } from '@mui/styles';
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
    {
        field: 'student_id',
      align: 'right',
      disablePadding: false,
      headerName: 'Student ID'
    },
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
        return dayjs(val.value).format("YYYY/MM/DD hh:mm:ss A")
      }
    },
    {
        field: 'expiration_date',
      align: 'right',
      disablePadding: false,
      headerName: 'Valid Till',
    //   renderCell:(val)=>{
    //     return dayjs(val.value).format("YYYY/MM/DD hh:mm:ss A")
    //   }
    },
  ];
// const columns = [
//   {
//     field:'id',
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
  const [ selectedRow ,setSelectedRow] = useState({})

  const handleRowClick = (e) =>{
   setSelectedRow(e)
  }
  const handlePostMortem =()=>{
   alert(selectedRow.id)
  }
  const handleDelete =()=>{
    alert(selectedRow.id)
  }
    return <><div >
   
      <Box sx={{ height: '100%', width: '100%' }}>
      <Stack sx={{pb:1}}
      direction="row"
      justifyContent="flex-end"
      alignItems="flex-end"
      spacing={2}
     >
    {/* <Button variant="contained" sx={{color:"white"}} onClick={e=>handlePostMortem()}>POSTMORTEM</Button>
    <Button variant="contained" sx={{color:"white"}} >VIEW INCIDENT</Button>
    <Button variant="contained" sx={{color:"white"}} onClick={e=>handleDelete()}>DELETE</Button> */}
     </Stack>
       {
        tableLoading?  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </div>:
       tabledata?.length>0?
       <div style={{ height: '100%' }}>
          <DataGrid  columns={headCells} rows={tabledata} autoHeight={true}  pageSize={10}
        rowsPerPageOptions={[5]}
        pageSizeOptions={[5, 10, 25,50]}
        headerClassName={classes.customHeader}
        initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
        // onRowClick={handleRowClick}
    //     sx={{
    //       "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
    //          outline: "none !important",
    //       },
          
    //    }}
      />
       </div> 
       :
      <div>
      {/* Display only column names */}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid columns={headCells} autoHeight={true} rows={[]}  headerClassName={classes.customHeader}/>
 </div>
    <p>No data available</p>
     </div>
    
      }
        </Box>
    </div>
    </>
}
export default DataTable;