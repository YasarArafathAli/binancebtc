import React,{useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';

function Dashboard({message}) {

    const [chartdata,setChartData] = useState([])
    
    const updateData = () => {
        if(message){
            const newdata = {
            time:  message.T,
            price: message.p,
            quantity: message.q
        }
        console.log(newdata)
        setChartData([...chartdata, newdata])
    }
}
    
    useEffect(() => {

        setTimeout(()=>{
         updateData()
        }, 1000)
    
      }, [chartdata])
  return <div>
  {JSON.stringify(message)} <br/>
  {JSON.stringify(chartdata)}
  </div>
}

export default Dashboard