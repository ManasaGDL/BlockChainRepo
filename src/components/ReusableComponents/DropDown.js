/*eslint-disable*/
import { useContext , useState, useEffect } from 'react';

import { Select,Stack,FormControl,InputLabel,MenuItem} from '@mui/material';


import {dropdownContext} from 'context/DropDownContext';
const DropDown = ({data})=>{

  const {valuesSelected ,setValuesSelected} = useContext(dropdownContext)
  const [ universities , setUniversities] = useState([])
  // const [ departments , setDepartments] = useState([])
  console.log("DDValues",valuesSelected )
useEffect(()=>{
console.log("Uni",universities)
},[universities])
useEffect(()=>{
  
if(data.length>0)
{
setUniversities(data)

}
},[data])




  const handleUniversityChange=(e)=>{
    const { dept_id, ...newValuesSelected } = valuesSelected;
    setValuesSelected({...newValuesSelected ,'client_id':e.target.value})
  }
  const handleDepartmentChange=(e)=>{
    
    setValuesSelected({...valuesSelected ,'dept_id':e.target.value})
  }
    return <Stack direction="row" spacing={2}>
    <FormControl>
      <InputLabel id="demo-simple-select-label" style={{color:"#1976d2",fontWeight:"500",fontSize:"14px"}}
      >University</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
         style={{ width: '300px',height:"50px" ,color:"#1976d2",fontWeight:"500"}}  
         value={valuesSelected ?.client_id}
        onChange={handleUniversityChange}
      >
        {
          universities.map(university=>{
            return <MenuItem key={university.client_id} value={university.client_id}>{university.client_name}</MenuItem>
          })
        }
       
      </Select>
    </FormControl>
  
    <FormControl>
      <InputLabel id="demo-simple-select-label" style={{color:"#1976d2",fontWeight:"500",fontSize:"14px"}}>Department</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        disabled={valuesSelected ?.client_id===0}
        style={{ width: '300px',height:"50px" ,color:"#1976d2", borderRadius: '8px',fontWeight:"500"}} 
         value={valuesSelected ?.dept_id}
         onChange={handleDepartmentChange}
      >
       {valuesSelected ?.client_id!='0' && 
                    universities.find(client => client.client_id === valuesSelected ?.client_id)?.departments.map(department => (
                        <MenuItem key={department.dept_no} value={department.dept_id}>
                            {department.dept_name}
                        </MenuItem>
                    ))
                }
      </Select>
    </FormControl>
  </Stack>
}


export default DropDown