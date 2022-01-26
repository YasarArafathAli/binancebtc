import React,{useState, useEffect} from 'react';
import {ComposedChart, Bar, Line , XAxis, YAxis, CartesianGrid } from 'recharts';
import moment from 'moment';
function Dashboard({message,type}) {
    const [chartdata,setChartData] = useState([]);
    
    const updateData = () => {
        if(message){
            const newdata = {
            time:  format(message.T),
            price: message.p,
            quantity: message.q
        }
        let updata = chartdata;
        if (chartdata.length >= 15){
            updata = updata.slice(-chartdata.length/2)
        }

        setChartData(currentdata => [...updata, newdata])
    }
}
 const format = (unixTime) => moment(unixTime).format('HH:mm:ss a')
    
    useEffect(() => {

        setTimeout(()=>{
         updateData();
        }, 500)
    
      })
  return <div>
   <ComposedChart width={1500} height={700} data={chartdata} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
    <XAxis dataKey="time" tickCount={15}/>
    <CartesianGrid stroke="#eee" strokeDasharray="10 10"/>
    <YAxis tickCount={22} domain={type === "price" ? ['dataMin - 100', 'dataMax + 200'] : [0, 'dataMax + 0.01']}/>
    {type === "price" ? 
    (<Line type="monotone" dataKey="price" stroke="#8884d8" />)
    : (<Bar type="monotone" barSize={8} dataKey="quantity" stroke="#8884d8" />)
    }
      
  </ComposedChart>
  </div>
}

export default Dashboard;