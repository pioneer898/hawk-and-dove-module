const Scenario = require('./scenario.js');

const params = {
  dailyFoodPods: 2000,
  foodPodFoodQuantity: 20,
  startingPopulation: 20,
  doveToHawkDays: 3,
  fightEnergy: 0.5,
  chanceToDieFromFight: 50,
  hawkExperienceBonus: 15
};

const scenario = new Scenario(params);
const daysToRun = 100;
for(let d=0;d<daysToRun;d++){
  console.log(JSON.stringify(scenario.runDay()));
}

let popSum = 0;
scenario.days.forEach(e=>{
  popSum += e.creatures;
});
console.log('Avg Population: ',popSum/scenario.days.length);

let oldestCreature;
let oldestCreatureDays = 0;
let doveDaysSum = 0;
let hawkDaysSum = 0;
let allDaysSum = 0;
scenario.creatures.forEach(e=>{
  if(e.days.length > oldestCreatureDays){
    oldestCreature = e;
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
console.log('Oldest Creature',oldestCreature.days.length,oldestCreature.isDove?'Dove':'Hawk')