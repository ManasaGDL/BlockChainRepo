/*eslint-disable */
import React ,{ useState,useEffect,useContext} from "react"
import { DataGrid } from '@mui/x-data-grid'
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from "@mui/material";
import LoadingPanel from "components/ReusableComponents/LoadingPanel";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { tableDataContext, tableloadingContext,nextContext,exportContext ,dropdownContext} from "context/DropDownContext";
import { makeStyles } from '@mui/styles';
import api from "api/api";
import { CSVLink } from 'react-csv';
const headCells = [
   
    {
    field: 'id',
      align: 'center',
      disablePadding: false,
      headerName: 'Certicate ID',
      flex:1,
      minWidth:100,
   
      headerAlign: 'center',
   
    },
    {
         field: 'full_name',
      align: 'left',
      disablePadding: true,
      headerName: 'Institute',
      flex:1,
      minWidth:150
    },
    {
        field: 'course',
      align: 'right',
      disablePadding: false,
      headerName: 'Course',
      flex:1,
      minWidth:200,
    },
    {
        field: 'degree',
      align: 'left',
      disablePadding: false,

      headerName: 'Degree',
      minWidth:150,
    },
    {
        field: 'semister',
     align:"center",
      disablePadding: false,
      headerName: 'Semister',
    
      align:"left"
    },
    // {
    //     field: 'student_id',
    //   align: 'right',
    //   disablePadding: false,
    //   headerName: 'Student ID'
    // },
    {
        field: 'student_name',
     
      disablePadding: false,
      headerName: 'Student name',
      minWidth:150,
      align:"left"
    },
    {
        field: 'certi_type',
      align: 'right',
      disablePadding: false,
      headerName: 'Certificate Type',
      minWidth:180,
      align:"left"
    },
   
  
   
    {
        field: 'completed_date',
      align: 'left',
      disablePadding: false,
      headerName: 'Completed on'
    },
    {
        field: 'grade',
      
      disablePadding: false,
      headerName: 'Grade',
      align:"left"
    },
    {
        field: 'issued_date',
      align: 'right',
      disablePadding: false,
      headerName: 'Issued date',
      // renderCell:(val)=>{
      //   return dayjs(val.value).format("YYYY/MM/DD ")||'--'
      // }
    },
    // {
    //     field: 'expiration_date',
    //   align: 'left',
    //   disablePadding: false,
    //   headerName: 'Valid Till',
    
    // },
  ];




 
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
const {exportData , setExportData} = useContext(exportContext)

const {valuesSelected } = useContext(dropdownContext)
const [paginationModel, setPaginationModel] = useState({
  pageSize: nextApi.pageSize,
  page: nextApi.page-1,
  totalRows:nextApi.totalRows
});
useEffect(()=>{
console.log("tabledata",tabledata)
},[tabledata])
useEffect(()=>{

if(nextApi?.reset)
{
  setPaginationModel({pageSize: nextApi.pageSize,
    page: nextApi.page-1,
    totalRows:nextApi.totalRows})

}

},[nextApi?.reset])
useEffect(()=>{
getExportData()
},[valuesSelected.issuer_id,valuesSelected.department_id])
useEffect(()=>{
 
  setNextApi({...nextApi,"pageSize":paginationModel.pageSize,"page":paginationModel.page+1,"reset":false})
},[paginationModel])
  const handleRowClick = (e) =>{
   setSelectedRow(e)
  }

  const handlePaginationChange=(e)=>{
    console.log(e)
     setPaginationModel({...nextApi,"pageSize":e.pageSize,"page":e.page})
   
  }
  const header = [
    {
    key: 'id',
    label: 'Certicate ID',
    },
    {    
     key: 'full_name',   
     label: 'Institute',   
    },
    // {
    //   key:"dept_name",
    //   label:"Department"
    // },
    {
      key: 'course', 
      label: 'Course',
    },
    {
      key: 'degree',
      label: 'Degree'
    },
    {
      key: 'semister',

      label: 'Semister'
    },
    
    {
      key: 'student_name',  
      label: 'Student name'
    },
    {
      key: 'certi_type',
      label: 'Certificate Type'
    },
    {
      key: 'completed_date',
      label: 'Completed on'
    },
    {
      key: 'grade', 
      label: 'Grade'
    },
    {
      key: 'issued_date',
      label: 'Issued date',
     
    },
   
  ];
  const getExportData=async()=>{
 try{
 
 const res = await api.getExportData(valuesSelected.issuer_id,valuesSelected.department_id)
console.log("export",res.data)
 setExportData(res?.data.map(row=>{
  return {id:row?.id,"full_name":row?.user?.full_name,
  "dept_name":row?.department?.department_name,
  "degree":row?.department?.department_name,
  "course":row.course?.course_name,
  "semister":row?.student?.studentmarks[0]?.semester,
  "student_id":"*",
  'student_name':row?.student?.student_name,
  'certi_type':row?.certificatetype?.certificate_name||'--',
  'completed_date':row?.student?.studentmarks[0]?.certificate_issued_date||'--',
  'grade': row?.student?.studentmarks[0]?.grade,
  'issued_date':row?.student?.studentmarks[0]?.certificate_completion_date||'--',
 




}
}))
 }catch(e)
 {

 }
  }

    return <><div >
   <Stack direction = "row" justifyContent="flex-end" >
        <Button size="small"   sx={{ m: 1 }}  variant="outlined" > 
        <CSVLink data={exportData} headers={header} filename="CertificateDetails">
          Export to CSV
        </CSVLink></Button>
      </Stack>
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