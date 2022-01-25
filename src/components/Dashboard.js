import React from 'react';
import {Line} from 'react-chartjs-2'

function Dashboard(props) {

    const data = {"stream":"btcusdt@trade","data":{"e":"trade","E":1643135979291,"s":"BTCUSDT","t":1235805672,"p":"37396.04000000","q":"0.09252000","b":9140832801,"a":9140832790,"T":1643135979291,"m":false,"M":true}}
    
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
  
  {JSON.stringify(data.e)}
  </div>
}

export default Dashboard