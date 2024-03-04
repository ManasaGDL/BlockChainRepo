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
   get_table_data:(client_id,dept_id)=>{
      if(client_id===0)
      return axios.get(`${baseURL}/api/dashboard/certificates`)
     else if(client_id>0 && dept_id)  
     return axios.get(`${baseURL}/api/dashboard/certificates?client_id=${client_id}&dept_id=${dept_id}`)
   else return axios.get(`${baseURL}/api/dashboard/certificates?client_id=${client_id}`)
   }
}


export default api