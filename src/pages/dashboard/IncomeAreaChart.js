/*eslint-disable*/
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

// ==============================|| INCOME AREA CHART ||============================== //

const IncomeAreaChart = ({ slot ,weekData,monthData}) => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);
   
  const [series, setSeries] = useState([
    
  ]);
  const mappingName ={
    "count":"Certificates Generated",
    "verified_users":"Verified Certificates",
    "revoked_users":"Revoked Users"
  }
useEffect(()=>{

if(weekData.length>0 && slot==="week")
{
  const result = Object.keys(weekData[0]).reduce((acc, key) => {
    if (!["day","month"].includes(key)) {
      acc.push({
        name: mappingName[key]||key,
        data: weekData.map(item => item[key])
      });
    }
    return acc;
  }, []);
console.log("result-weely",result)
 setSeries(result)
}
if(monthData.length>0 && slot==="month")
{
  const result = Object.keys(monthData[0]).reduce((acc, key) => {
    if (!["day","month"].includes(key)) {
     
        acc.push({
          name: mappingName[key]||key,
          data: monthData.map(item => item[key])
        });
   
     
    }
    return acc;
  }, []);
  
 setSeries(result)
}
},[weekData,monthData,slot])

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main,"#DF6D2F","#C0C0C0"
        // theme.palette.primary.main, theme.palette.primary[700],theme.palette.primary[200]
      ],
      xaxis: {
        categories:
          slot === 'month'
            ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: slot === 'month' ? 11 : 7
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      }
    }));
  }, [primary, secondary, line, theme, slot]);



  // useEffect(() => {
  //   setSeries([
  //     {
  //       name: 'Page Views',
  //       data:  [76, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35] : [31, 40, 28, 51, 42, 109, 100]
  //     },
  //     {
  //       name: 'Sessions',
  //       data: slot === 'month' ? [110, 60, 150, 35, 60, 36, 26, 45, 65, 52, 53, 41] : [11, 32, 45, 32, 34, 52, 41]
  //     }
  //   ]);
  // }, [slot]);

  return <ReactApexChart options={options} series={series} type="area" height={450} />;
};

IncomeAreaChart.propTypes = {
  slot: PropTypes.string
};

export default IncomeAreaChart;
