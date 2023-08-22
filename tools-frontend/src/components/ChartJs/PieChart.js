import React from 'react'
import { Pie, defaults } from 'react-chartjs-2'

defaults.global.tooltips.enabled = true
defaults.global.legend.position = 'bottom'

const PieChart = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderWidth: 1,
      },
    ],
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "Pie Chart"
    },
    elements: {
      point: {
        radius: 0
      }
    },
    hover: {
      mode: "nearest",
      intersect: false
    },
    tooltips: {
      custom: false,
      mode: "nearest",
      intersect: false
    },
   
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }
  return (
    <div>
      <Pie
        data={data}
        height={400}
        width={300}
        options={options}
      />
    </div>
  )
}

export default PieChart
