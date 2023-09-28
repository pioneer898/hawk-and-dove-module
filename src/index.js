const Scenario = require('./scenario.js');

const params = {
  dailyFoodPods: 10,
  foodPodFoodQuantity: 2,
  startingPopulation: 20,
  doveToHawkDays: 3,
  fightEnergy: 0.5,
  daysToRun: 200
};

const scenario = new Scenario(params);

for(let d=0;d<params.daysToRun;d++){
  scenario.runDay();
  console.log(scenario.days[scenario.days.length-1]);
}

let popSum = 0;
scenario.days.forEach(e=>{
  popSum += e.creatures;
});
console.log('Avg Population: ',popSum/scenario.days.length);

let oldestCreatureDays = 0;
let doveDaysSum = 0;
let hawkDaysSum = 0;
let allDaysSum = 0;
scenario.creatures.forEach(e=>{
  if(e.days.length > oldestCreatureDays){
    oldestCreatureDays = e.days.length;
  }
  if(e.isDove){
    doveDaysSum += e.days.length;
  } else {
    hawkDaysSum += e.days.length;
  }
  allDaysSum += e.days.length;
});
console.log('Average Lifespan',allDaysSum/scenario.creatures.length)
console.log('Dove Average Lifespan',doveDaysSum/scenario.creatures.filter(e=>e.isDove === true).length)
console.log('Hawk Average Lifespan',hawkDaysSum/scenario.creatures.filter(e=>e.isDove === false).length)
console.log('Oldest Creature',oldestCreatureDays)