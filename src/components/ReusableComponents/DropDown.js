/*eslint-disable*/
import { useContext , useState, useEffect } from 'react';

import { Select,Stack,FormControl,InputLabel,MenuItem} from '@mui/material';


import {dropdownContext} from 'context/DropDownContext';
const DropDown = ({data})=>{

  const {valuesSelected ,setValuesSelected} = useContext(dropdownContext)
  const [ universities , setUniversities] = useState([])
  // const [ departments , setDepartments] = useState([])

useEffect(()=>{
  
if(data.length>0)
{
setUniversities(data)

}
},[data])




  const handleUniversityChange=(e)=>{
    const { department_id, ...newValuesSelected } = valuesSelected;
    setValuesSelected({...newValuesSelected ,'issuer_id':e.target.value})
  }
  const handleDepartmentChange=(e)=>{
    
    setValuesSelected({...valuesSelected ,'department_id':e.target.value})
  }
    return <Stack direction="row" spacing={2}>
   
    

    <FormControl>
   
      <InputLabel id="demo-simple-select-label" style={{color:"#1976d2",fontWeight:"500",fontSize:"14px"}}
      >University</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
         style={{ width: '300px',height:"50px" ,color:"#1976d2",fontWeight:"500"}}  
         value={valuesSelected ?.issuer_id}
        onChange={handleUniversityChange}
      >
        {
          universities.map(university=>{
            return <MenuItem key={university.id} value={university.id}>{university.full_name}</MenuItem>
          })
        }
       
      </Select>
    </FormControl>
  
    <FormControl>
      <InputLabel id="demo-simple-select-label" style={{color:"#1976d2",fontWeight:"500",fontSize:"14px"}}>Department</InputLabel>
      
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        disabled={valuesSelected ?.issuer_id===0}
        style={{ width: '300px',height:"50px" ,color:"#1976d2", borderRadius: '8px',fontWeight:"500"}} 
         value={valuesSelected ?.department_id||0}
         onChange={handleDepartmentChange}
      >
       {valuesSelected ?.issuer_id!='0' && 
                    universities.find(client => client.id === valuesSelected ?.issuer_id)?.departments.map(department => (
                        <MenuItem key={department.department_id} value={department.department_id}>
                            {department.department_name}
                        </MenuItem>
                    ))
                }
      </Select>
    </FormControl>
 
  </Stack>
}


export default DropDown