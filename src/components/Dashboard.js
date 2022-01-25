import React from 'react';
import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

function Dashboard(props) {

    const data = {"e":"trade","E":1643135979291,"s":"BTCUSDT","t":1235805672,"p":"37396.04000000","q":"0.09252000","b":9140832801,"a":9140832790,"T":1643135979291,"m":false,"M":true}
    
    const chartdata = {
        time: data.T,
        price: data.p,
        quantity: data.q
    }
    const options = {
        responsive: true,   
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };
  return <div>
  
  {JSON.stringify(props.message&& props.message.T)}
  </div>
}

export default Dashboard