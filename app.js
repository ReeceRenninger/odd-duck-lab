'use strict';



//***** GLOBAL VARIABLES *///
let imgArray = [];
let votingRounds = 25;


//***** DOM WINDOWS */

let imgContainer = document.getElementById('imgContainer');
let imgOne = document.getElementById('firstImg');
let imgTwo = document.getElementById('secondImg');
let imgThree = document.getElementById('thirdImg');
let resultsBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-container');

//**** CONSTRUCTOR FUNCTION */
function Product(name, fileExtension = 'jpg') {
  this.name = name;
  //use name above to route the img src and attach jpg extension
  this.image = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.votes = 0;
}


//******** HELPER FUNCTION / UTILITIES */
// TODO: 3 images on page
function renderImgs() {
  let imgOneIndex = randomImgByIndex();
  let imgTwoIndex = randomImgByIndex();
  let imgThreeIndex = randomImgByIndex();

  // TODO: make images UNIQUE to display
  // ** compare image one vs two and three and if they are the same, get a new randomImg for indexOne
  while (
    imgOneIndex === imgTwoIndex ||
    imgOneIndex === imgThreeIndex ||
    imgTwoIndex === imgThreeIndex
  ) {
    imgOneIndex = randomImgByIndex();
    imgTwoIndex = randomImgByIndex();
    imgThreeIndex = randomImgByIndex();
  }

  imgOne.src = imgArray[randomImgByIndex()].image;
  imgOne.alt = `this is an image of ${imgArray[imgOneIndex].name}`;
  imgOne.title = imgArray[imgOneIndex].name;

  imgTwo.src = imgArray[randomImgByIndex()].image;
  imgTwo.alt = `this is an image of ${imgArray[imgTwoIndex].name}`;
  imgTwo.title = imgArray[imgTwoIndex].name;

  imgThree.src = imgArray[randomImgByIndex()].image;
  imgThree.alt = `this is an image of ${imgArray[imgThreeIndex].name}`;
  imgThree.title = imgArray[imgThreeIndex].name;

  // TODO: INCREASE VIEWS ON IMAGES
  imgArray[imgOneIndex].views++;
  imgArray[imgTwoIndex].views++;
  imgArray[imgThreeIndex].views++;
}
// pulls random img from array by index number
function randomImgByIndex() {
  return Math.floor(Math.random() * imgArray.length);
}

function handleImgClick(event) {
  //TODO: IDENTIFY THE IMG THAT WAS CLICKED
  let imgClicked = event.target;
  console.dir(imgClicked);
  // TODO: INCREASE NUMBER OF CLICKS ON THAT IMAGE
  for (let i = 0; i < imgArray.length; i++) {
    if (imgClicked === imgArray[i].name) {
      imgArray[i].votes++;
    }
  }
  // TODO: DECREMENT THE VOTING ROUNDS
  votingRounds--;
  // TODO: RERENDER OF IMAGES
  renderImgs();
  // TODO: ONCE VOTING ROUND ENDS, STOP THE CLICK
  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleImgClick);
    // document.getElementById('show-results-btn').style = 'visiblity: visible';
  }
}

function handleVoteResults(){
  if(votingRounds === 0){
    for(let i = 0; i < imgArray.length; i++){
      let productListItem = document.createElement('li');
      productListItem.textContent = `${imgArray[i].name}: views:${imgArray[i].views} votes:${imgArray[i].votes}`;
      resultsList.appendChild(productListItem);
    }
    resultsBtn.removeEventListener('click', handleVoteResults);
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

imgArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogduck, dragon, pen, petsweep, scissors, shark, sweep, tauntaun, unicorn, watercan, wineglass);// all obejcts created above

renderImgs();

imgContainer.addEventListener('click', handleImgClick);
resultsBtn.addEventListener('click', handleVoteResults);