'use strict';

//***** GLOBAL VARIABLES *///
let imgArray = [];
let votingRounds = 25;
let indexArray = [];

//***** DOM WINDOWS */
let imgContainer = document.getElementById('imgContainer');
let imgOne = document.getElementById('firstImg');
let imgTwo = document.getElementById('secondImg');
let imgThree = document.getElementById('thirdImg');
let resultsBtn = document.getElementById('show-results-btn');
let ctx = document.getElementById('myChart');


//********** CONSTRUCTOR FUNCTION **************/
function Product(name, fileExtension = 'jpg') {
  this.name = name;
  //use name above to route the img src and attach jpg extension
  this.image = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.votes = 0;
}
//*********** CHART RENDER ************/
function renderChart() {

  let prodNames = [];
  let prodVotes = [];
  let prodViews = [];

  for (let i = 0; i < imgArray.length; i++) {
    prodNames.push(imgArray[i].name);
    prodVotes.push(imgArray[i].votes);
    prodViews.push(imgArray[i].views);
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
  new Chart(ctx, chartObj); // calls Chart constructor from script tag to library ** 2 args for Chart Constructor - canvas element, config obj with prod data
}

//******** HELPER FUNCTION / UTILITIES */
function renderImgs() {
  while (indexArray.length < 6) {
    let randNum = randomImgByIndex();
    if (!indexArray.includes(randNum)){
      indexArray.push(randNum);
    }
  }
  console.log(indexArray);

  let imgOneIndex = indexArray.shift();
  let imgTwoIndex = indexArray.shift();
  let imgThreeIndex = indexArray.shift();

  imgOne.src = imgArray[imgOneIndex].image;
  imgOne.alt = `this is an image of ${imgArray[imgOneIndex].name}`;
  imgOne.title = imgArray[imgOneIndex].name;

  imgTwo.src = imgArray[imgTwoIndex].image;
  imgTwo.alt = `this is an image of ${imgArray[imgTwoIndex].name}`;
  imgTwo.title = imgArray[imgTwoIndex].name;

  imgThree.src = imgArray[imgThreeIndex].image;
  imgThree.alt = `this is an image of ${imgArray[imgThreeIndex].name}`;
  imgThree.title = imgArray[imgThreeIndex].name;

  imgArray[imgOneIndex].views++;
  imgArray[imgTwoIndex].views++;
  imgArray[imgThreeIndex].views++;
}
// pulls random img from array by index number
function randomImgByIndex() {
  return Math.floor(Math.random() * imgArray.length);
}

function handleImgClick(event) {
  let imgClicked = event.target.title;
  console.dir(imgClicked); // prints title of img clicked in console
  for (let i = 0; i < imgArray.length; i++) {
    if (imgClicked === imgArray[i].name) {
      imgArray[i].votes++;
      votingRounds--;
      renderImgs(); // combining all logic in if loop forces user to click img or wont cycle
    }
  }
  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleImgClick);
  }
}

function handleVoteResults() {
  if (votingRounds === 0) {
    resultsBtn.removeEventListener('click', handleVoteResults);
    renderChart();
  }
}

//********* EXECUTABLE CODE */
let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogduck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let petsweep = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let sweep = new Product('sweep', 'png');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let watercan = new Product('water-can');
let wineglass = new Product('wine-glass');

imgArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogduck, dragon, pen, petsweep, scissors, shark, sweep, tauntaun, unicorn, watercan, wineglass);
renderImgs();

imgContainer.addEventListener('click', handleImgClick);
resultsBtn.addEventListener('click', handleVoteResults);
console.log(imgArray);
