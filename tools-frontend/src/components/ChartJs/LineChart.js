import React from 'react'
import { Line, defaults } from 'react-chartjs-2'

defaults.global.tooltips.enabled = true
defaults.global.legend.position = 'bottom'

const LineChart = () => {
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
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Quantity',
        data: [7, 40, 7, 58, 9, 50],
        // backgroundColor: 'rgba(255, 0, 255, 0.5)',
        // borderColor: 'red',
        pointBackgroundColor: "purple",
        pointBorderColor: "green"
      },
    ],
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "Line Chart"
    },
    elements: {
      line: {
        // A higher value makes the line look skewed at this ratio.
        tension: 0.3
      },
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
    scales: {
      yAxes: [
        {
          gridLines: false,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          gridLines: false,
        },
      ],
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }
  return (
    <div>
      <Line
        data={data}
        height={400}
        width={700}
        options={options}
      />
    </div>
  )
}

export default LineChart
