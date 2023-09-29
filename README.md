# hawk-and-dove-module
Node.js Hawk and Dove Module

This is a module I built after watching [Primer's video about game theory](https://www.youtube.com/watch?v=YNMkADpvO4w). Simulations are always fascinating to me. Note that this take on the Hawk & Dove scenario has some different rules and parameters than the video. 

## Options
The scenario takes a object parameters with the following properties:
```js
const params = {
  dailyFoodPods: 20,
  foodPodFoodQuantity: 2,
  startingPopulation: 20,
  doveToHawkDays: 3,
  fightEnergy: 0.5,
  chanceToDieFromFight: 50,
  hawkExperienceBonus: 15
};
```

## Running Simulation
To simulate a "day" simply call `.runDay()`. This method will return the object representing the day that was run. Here is an example of running for 20 days:
```js
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
```

## Rules
- Simulation initially starts out with `startingPopulation` creatures all of which are doves.
- Each "day" `dailyFoodPods` food pods will appear.
- Each food pod will contain `foodPodFoodQuantity` food.
- All creatures will randomly pick a food pod to eat from for that day. This means that some food pods could be untouched, and some could have many creatures eating from it.
- A dove will turn into a hawk if it has to share food `doveToHawkDays` times. This will occur at the end of the day.
- A creature's chance of survival is the percentage of 1 food that it eats in a day. (0.5 food = 50%)
- A creature's chance of reproduction is the percentage of 1 food remaining after eating. (1.5 food = 100% chance of survival and 50% chance of reproduction)
- A creature can only take a maximum of 2 food (1 for survival and 1 for reproduction).
- If a food pod is visited only by doves, the food will be split evenly by all doves..
- Creatures approach the food pile, and at the end of the day, the food is distributed.
- If a hawk approaches a food pod that another hawk has already chosen, the hawks will fight:
  - Fighting will consume `fightEnergy` food points from the food pod.
  - Hawks fight wins are tracked, and the hawk with the most previous fight wins has a 50% + `hawkExperienceBonus` chance of winning the fight.
  - If both hawks are evenly matched, the win chance is 50/50.
  - If a hawk looses, it is killed.
  - If a hawk wins it has a `chanceToDieFromFight` chance of dying.
  - This process will repeat each time another hawk approaches the food pile.
- If the food pile has a hawk remaining, at the end of the day, the hawk will take 1 food from the pile, and the rest is split between all creatures (including the hawk).
  - If there is less than 1 food available, the hawk will take it all and none will remain for the doves.
- All creatures either survive or die based on their food value.
- All surviving creatures will reproduce based on their remaining food. New offspring are either a hawk or a dove matching their parent.
- The day ends, new food pods are generated, and the process restarts.

## Design
This project keeps a log of every creature. In additon, each creature has a daily log that tracks events for that specific creature. Ancestry is also tracked for each creature. This is all just for the fun of being able to look at each creature's story, but it does mean that this simulation doesn't scale well beyond millions of creatures, and it's memory usage will continue to grow as the simulation runs.