/* eslint-disable */
import { useState , useEffect , useContext} from "react"; 
import {dropdownContext,dataContext,loadingContext,cardsContext,tableDataContext,tableloadingContext,nextContext} from "context/DropDownContext";
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
 const { nextApi,setNextApi} = useContext(nextContext)
 const {cardsData,setCardsData} = useContext(cardsContext)
  useEffect(()=>{
    const get_data=async()=>{

      const res= await api.getData_univeristywise({"all":1})
    getCardsData()
      setData(res?.data)
      setTableLoading(true)
      const res2 = await api.get_table_data(0,0,nextApi.page,nextApi.pageSize)
    
      setNextApi({...nextApi,"next":res2.data?.next,"totalRows":res2?.data?.count})
      setTabledata(res2?.data?.results?.map(row=>{
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
    
    }
    get_data()
  }
 
    ,[])
 useEffect(()=>{
  
const getUniversities_departments=async()=>{
try{

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
useEffect(()=>{
get_Table_data()
},[nextApi.page,nextApi.pageSize])

const get_Table_data=async()=>{
  setTableLoading(true)
  const res2 = await api.get_table_data(valuesSelected?.client_id,valuesSelected?.dept_id||0,nextApi.page,nextApi.pageSize)
  setNextApi({...nextApi,"totalRows":res2.data.count})
  setTabledata(res2?.data.results.map(row=>{
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
}
const getCardsData =async()=>{
  try{
 
     const res = await api.getCardsData(valuesSelected?.client_id===0?{"all":1}:valuesSelected)
    
   setCardsData(res?.data)
  }
  catch(e)
  {
  console.log(e)
  }

}
 const submitData=async()=>{
 try{
  
setLoading(true)
setTableLoading(true)
getCardsData()
// setNextApi({...nextApi,"page":1,"pageSize":nextApi.pageSize})
 const res= await api.getData_univeristywise(valuesSelected?.client_id===0?{"all":1}:valuesSelected)
 setLoading(false)
 const res2 = await api.get_table_data(valuesSelected?.client_id,valuesSelected?.dept_id||0,1,nextApi.pageSize)
 setNextApi({...nextApi,"page":1,totalRows:res2.data.count,"reset":true})
 setTabledata(res2?.data.results.map(row=>{
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
//  setNextApi({...nextApi,"page":1,totalRows:res2.data.count,"reset":false})
 }catch(e)
 {
console.log(e)
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
