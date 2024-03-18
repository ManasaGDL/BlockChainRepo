import axios from "axios"
import { baseURL } from "./axiosConnector"
const api ={
   getChartData:()=> {
   return axios.get(`${baseURL}/api/dashboard/dashBoard_chart_data`)
   }
   ,
   getCardsData:(payload)=>{
    return axios.put( `${baseURL}/api/dashboard/dashBoard_data`,payload)
   },
   getDropDown:()=>{
      return axios.get(`${baseURL}/api/dashboard/clients_departments`)
   },
   getData_univeristywise:(payload)=>{
      return axios.put(`${baseURL}/api/dashboard/dashBoard_chart_data`,payload)
   },
   get_table_data:(client_id,dept_id,page,pageSize)=>{
     
      if(client_id===0)
      { 
        
         return axios.get(`${baseURL}/api/dashboard/certificates?page=${page}&page_size=${pageSize}`)
      }
     else if(client_id>0 && dept_id) 
     { 
   return axios.get(`${baseURL}/api/dashboard/certificates?user_id=${client_id}&department_id=${dept_id}&page=${page}&page_size=${pageSize}`)
     }
     else 
     {
      return axios.get(`${baseURL}/api/dashboard/certificates?user_id=${client_id}&page=${page}&page_size=${pageSize}`)
   }},
   getExportData:(client_id,dept_id)=>{
      if(client_id===0)
      {    
      return axios.get(`${baseURL}/api/dashboard/certificates/?disable_pagination=1`) 
      }
     else if(client_id>0 && dept_id)
      return axios.get(`${baseURL}/api/dashboard/certificates/?user_id=${client_id}&department_id=${dept_id}&disable_pagination=1`)  
       else 
      {
      return axios.get(`${baseURL}/api/dashboard/certificates?user_id=${client_id}&disable_pagination=1`)
    
   }}
}


export default api