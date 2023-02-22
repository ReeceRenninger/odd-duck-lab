'use strict';

let retrievedArr = localStorage.getItem('imgArray');

let parsedData = JSON.parse(retrievedArr);

let canvasElem = document.getElementById('myChart'); //TODO: CREATE CANVAS ELEMENT ON CHART HTML

// TODO: COPY OVER RENDER CHART FUNCTION FROM APP.js

function renderChart() {

  let prodNames = [];
  let prodVotes = [];
  let prodViews = [];

  for (let i = 0; i < parsedData.length; i++) {
    prodNames.push(parsedData[i].name);
    prodVotes.push(parsedData[i].votes);
    prodViews.push(parsedData[i].views);
  }

  let chartObj = {
    type: 'bar',
    data: {
      labels: prodNames, //** NEEDS TO BE AN ARRAY DATA TYPE **//
      datasets: [{
        label: '# of Votes',
        data: prodVotes, //** NEEDS TO BE AN ARRAY DATA TYPE **//
        borderWidth: 1,
      },
      {
        label: '# of Views',
        data: prodViews, //** NEEDS TO BE AN ARRAY DATA TYPE **//
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  new Chart(canvasElem, chartObj); // calls Chart constructor from script tag to library ** 2 args for Chart Constructor - canvas element, config obj with prod data
}
if(retrievedArr){
  renderChart();
}
