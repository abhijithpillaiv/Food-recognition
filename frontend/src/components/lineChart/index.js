import React from 'react'
import { CChart } from '@coreui/react-chartjs';

export default function index({nut,labels,value}) {
  return (
    <CChart
  type="line" 
  data={{
    labels: labels,
    datasets: [
      {
        label: nut,
        backgroundColor: "rgba(220, 220, 220, 0.2)",
        borderColor: "rgba(220, 220, 220, 1)",
        pointBackgroundColor: "rgba(220, 220, 220, 1)",
        pointBorderColor: "black",
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
      }
    ],
  }}
/>
  )
}
