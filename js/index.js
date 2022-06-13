let opt;
let statTypes = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

let statsActual = [];

let statOrderPreference = ['cha', 'dex', 'con', 'wis', 'int', 'str'];

function getOptions (callback) {
  fetch('./js/warlockOptions.json')
    .then(response => response.json())
    .then(data => {
      opt = data;
      callback();
    });
}

function getRandomName () {
  // let nameList = opt.data.level1.name;
  let nameList = opt.level1.name;
  let elementNumber = Math.floor(Math.random()*nameList.length);
  return nameList[elementNumber];
}

function setupStatOrder () {
  let statsOrder = document.getElementById('statOrder');

  for (let i=0; i<statOrderPreference.length; i++){
      // debugger;
      let stat = document.createElement('div');
      statsOrder.append(stat);
      stat.classList.add('statPreference');
      stat.classList.add(statOrderPreference[i] + 'Pref');

      let statNumber = document.createElement('div');
      statNumber.innerText = i + 1;
      statNumber.classList.add('statPrefNumber');
      stat.appendChild(statNumber);

      let statName = document.createElement('div');
      statName.innerText = statOrderPreference[i];
      statName.classList.add('statPrefName');
      stat.appendChild(statName);

      let buttons = document.createElement('div');
      buttons.classList.add('sortPreferenceButtons');
      buttons.setAttribute('id', 'sortPreferenceButtons');
      stat.appendChild(buttons);

      if (i !== 0) {
        let upButton = document.createElement('button');
        upButton.innerText = 'up';
        upButton.setAttribute('onClick', `updateStatPrefs(${i}, "up")`);
        buttons.appendChild(upButton);
      }
      if (i != statOrderPreference.length -1) {
        let downButton = document.createElement('button');
        downButton.innerText = 'down';
        downButton.setAttribute('onClick', `updateStatPrefs(${i}, "down")`);
        buttons.appendChild(downButton);
      }
  }
}

function updateStatPrefs (statNumber, direction){
  console.log(`move stat ${statNumber} ${direction}`);
  let movingStat = statOrderPreference.splice(statNumber, 1);
  let newPosition;
  if (direction === 'up'){
    newPosition = statNumber - 1;
  } else {
    newPosition = statNumber + 1;
  }
  statOrderPreference.splice(newPosition, 0, movingStat[0]);
  let statsOrder = document.getElementById('statOrder');
  statsOrder.innerHTML = '';
  setupStatOrder();
}

function generateWarlock () {
  let warlockElement = document.getElementById('warlock');
  warlockElement.innerHTML = `<div class="name" id="name">${getRandomName()}</div>`;
  addStats(warlockElement);

}

function addStats (warlockElement) {
  let stats = rollAllStats2();
  let statsContainer = document.createElement('div');
  statsContainer.classList.add('statsContainer');
  warlockElement.append(statsContainer);
  for (let i = 0; i < statTypes.length; i++ ) {
    let s = document.createElement('div');
    s.classList.add('stat');
    // s.classList.add(statTpes[i]);
    let v = document.createElement('div');
    v.classList.add(statTypes[i], 'statValue');
    v.appendChild(document.createTextNode(stats[i]));

    // s.innerHTML = `<div class=${statTypes[i]} statValue id=${statTypes[i]}>${stats[i]}</div>`;
    statsContainer.append(s);
    s.appendChild(v);
    let tag = document.createElement('div');
    tag.classList.add('statName');
    let text = document.createTextNode(statTypes[i]);
    tag.appendChild(text);
    s.appendChild(tag);
  }
}

function rollStat (min, max){
  let numbers = [];
  for (let i=0;i<4;i++){
    numbers.push(Math.floor(Math.random()*6) + 1);
  }
  numbers.sort((a,b) => a-b);
  if (min === undefined) {min = 0};
  if (max === undefined) {max = 18};
  let stat = numbers[1] + numbers[2] + numbers[3];
  if (stat < min || stat > max){
    stat = rollStat(min, max);
  }
  return stat;
}

// this one rolls stats and makes sure they fit within a range for each stat
// this function is no longer used
function rollAllStats () {
  let stats = [];
  let statRanges = opt.level1.stats;


  for (let i = 0; i < statTypes.length; i++){
    opt.level1.stats[statTypes[i]][0]
    let statMin = statRanges[ statTypes[i] ] [0];
    let statMax = statRanges[ statTypes[i] ] [1];
    let s = rollStat(statMin, statMax);
    stats.push(s);
  }
  statsActual = stats;
  return stats;
}

// this version of this function rolls 6 stats and puts them in your order of
// preference as set in the statOrderPreference array above.
function rollAllStats2 () {
  let rolledStats = [];
  let stats = [0,0,0,0,0,0];
  for (let i = 0; i < statTypes.length; i++){
    rolledStats.push(rollStat());
  }
  rolledStats.sort( (a,b) => a-b );
  for (let i=rolledStats.length; i>0; i--){
    let statName = statOrderPreference[statOrderPreference.length - i];
    let statIndex = statTypes.indexOf(statName);
    stats.splice(statIndex, 1, rolledStats.pop());
  }
  // console.log(stats);
  statsActual = stats;
  return stats;
}

function setup () {
  getOptions( () => {
    generateWarlock();
    setupStatOrder();
    // rollAllStats2();
  });
}

setup();

// console.log(getRandomName());
