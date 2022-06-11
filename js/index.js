let opt;
let statTypes = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

function getOptions (callback) {
  fetch('./js/warlockOptions.json')
    .then(response => response.json())
    .then(data => {
      opt = data;
      callback();
    });
}

function getRandomName(){
  // let nameList = opt.data.level1.name;
  let nameList = opt.level1.name;
  let elementNumber = Math.floor(Math.random()*nameList.length);
  return nameList[elementNumber];
}

function generateWarlock() {
  let warlockElement = document.getElementById('warlock');
  warlockElement.innerHTML = `<div class="name" id="name">${getRandomName()}</div>`;
  addStats(warlockElement);

}

function addStats(warlockElement) {
  let stats = rollAllStats();
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
  numbers.sort();
  let stat = numbers[1] + numbers[2] + numbers[3];
  if (stat < min || stat > max){
    stat = rollStat(min, max);
  }
  return stat;
}

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
  return stats;
}

function setup () {
  getOptions( () => {
    // rollAllStats();
  });
}

setup();

// console.log(getRandomName());
