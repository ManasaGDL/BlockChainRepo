/* eslint-disable */
import { useState , useEffect , useContext} from "react"; 
import {dropdownContext,dataContext,loadingContext,tableDataContext,tableloadingContext} from "context/DropDownContext";
// material-ui
import { Box,useMediaQuery ,Button,Stack} from '@mui/material';
import DropDown from 'components/ReusableComponents/DropDown';

// 

// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection'
import api from "api/api";

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [ university_departments_data , setUniversity_departments_data] = useState([{"client_id": 0,
  "client_name": "All",
  "departments":''}])
  const {valuesSelected } = useContext(dropdownContext)
  const { data , setData} = useContext(dataContext)
  const { loading,setLoading} = useContext(loadingContext)
const {tabledata, setTabledata} = useContext(tableDataContext)
const {tableLoading,setTableLoading}= useContext(tableloadingContext)
  const [ tableRawdata, settableRawdata] = useState([])
  useEffect(async()=>{

    const res= await api.getData_univeristywise({"all":1})
 
    setData(res?.data)
    setTableLoading(true)
    const res2 = await api.get_table_data(0)
    setTabledata(res2?.data.map(row=>{
    return {id:row?.id,"client_name":row?.client.client_name,
    "dept_name":row?.departments.dept_name,
    "degree":row?.departments.dept_name,
  "semister":"*",
  "student_id":"*",
  'student_name':"*",
  'certi_type':'*',
  'completed_date':'*',
  'grade':"*",
  'issued_date':row?.created_at,
  'expiration_date':"*"
  
  
  
  ,
  }
  }))
  setTableLoading(false)
  },[])
 useEffect(()=>{
  
const getUniversities_departments=async()=>{
try{
  let data=[
    {
        "client_id": 1,
        "client_name": "Geetham's university",
        "is_active": true,
        "departments": [
            {
                "dept_no": 1,
                "dept_name": "CSE",
                "is_active": 1
            },
            {
                "dept_no": 2,
                "dept_name": "IT",
                "is_active": 1
            },
            {
                "dept_no": 3,
                "dept_name": "ECE",
                "is_active": 1
            }
        ]
    },
    {
        "client_id": 2,
        "client_name": "Andhra university",
        "is_active": true,
        "departments": [
            {
                "dept_no": 4,
                "dept_name": "EEE",
                "is_active": 1
            },
            {
                "dept_no": 6,
                "dept_name": "MBM",
                "is_active": 1
            },
            {
                "dept_no": 7,
                "dept_name": "MCA",
                "is_active": 1
            }
        ]
    },
    {
        "client_id": 3,
        "client_name": "Acharya Nagarjuna University",
        "is_active": true,
        "departments": [
            {
                "dept_no": 5,
                "dept_name": "MECH",
                "is_active": 1
            }
        ]
    },
    {
        "client_id": 4,
        "client_name": "Adikavi Nannaya University",
        "is_active": true,
        "departments": []
    },
    {
        "client_id": 5,
        "client_name": "Dr. Y.S.R. Horticultural University",
        "is_active": true,
        "departments": []
    },
    {
        "client_id": 6,
        "client_name": "Jawaharlal Nehru Technological University",
        "is_active": true,
        "departments": []
    }
]
const res = await api.getDropDown();
const allOption = {
  "client_id": 0,
  "client_name": "All",
  "departments": ''
};
setLoading(false)
const updatedRes = [allOption, ...res.data];

    setUniversity_departments_data(updatedRes)
}catch(e)
{
console.log(e)
}
}
setLoading(true)
getUniversities_departments()
 },[])



 const submitData=async()=>{
 try{
setLoading(true)
setTableLoading(true)
 const res= await api.getData_univeristywise(valuesSelected?.client_id===0?{"all":1}:valuesSelected)
 setLoading(false)
 const res2 = await api.get_table_data(valuesSelected?.client_id,valuesSelected?.dept_id||0)
 setTabledata(res2?.data.map(row=>{
    return {id:row?.id,"client_name":row?.client.client_name,
    "dept_name":row?.departments.dept_name,
    "degree":row?.departments.dept_name,
  "semister":"*",
  "student_id":"*",
  'student_name':"*",
  'certi_type':'*',
  'completed_date':'*',
  'grade':"*",
  'issued_date':row?.created_at,
  'expiration_date':"*"
  
  
  
  ,
  }
  }))
 setData(res?.data)

 setTableLoading(false)

 }catch(e)
 {

 }
}
  return (
    <>
      {!matchesXs && <Search />}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

      {/* <IconButton
        component={Link}
        href="https://github.com/codedthemes/mantis-free-react-admin-template"
        target="_blank"
        disableRipple
        color="secondary"
        title="Download Free Version"
        sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
      >
        <GithubOutlined />
      </IconButton> */}
      <Stack direction="row" spacing={2} alignItems="center">
     <DropDown data={university_departments_data}/>
     <Button variant="contained" color="primary" onClick={()=>submitData()}>Submit</Button>
     </Stack>
      <Notification />
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
