import React,{useState, useEffect} from 'react';
import { LineChart, Line , XAxis, YAxis, CartesianGrid } from 'recharts';
function Dashboard({message}) {

    const [chartdata,setChartData] = useState([])
    
    const updateData = () => {
        if(message){
            const newdata = {
            time:  message.T,
            price: message.p,
            quantity: message.q
        }
        setChartData(currentdata => {
            let arraychange = currentdata;
            arraychange.shift();
            return [...arraychange, newdata]})
    }
}
//  const format = (unixTime) => moment(unixTime).format('HH:mm')
    
    useEffect(() => {

        setTimeout(()=>{
         updateData()
        }, 1000)
    
      })
  return <div>
   <LineChart width={500} height={300} data={chartdata} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
    <XAxis dataKey="time"/>
    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
    <YAxis tickCount={20}/>
    <Line type="monotone" dataKey="price" stroke="#8884d8" />
    <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
    
  </LineChart>
  </div>
}

export default Dashboard;