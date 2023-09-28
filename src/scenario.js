const Creature = require('./creature');
const FoodPod = require('./foodPod');

class Scenario{
  foodPods = [];
  creatures = [];
  livingCreatures = [];
  days = [];
  constructor(params){
    Object.assign(this,params);
    for(let c=0;c<this.startingPopulation;c++){
      this.creatures.push(new Creature());
    }
  }
  runDay(){
    this.setNewDays();
    this.spawnFoodPods(this.dailyFoodPods);
    this.findFood();
    this.compete();
    this.survive();
    this.reproduce();
    this.updateLivingCreatures();
    this.runConversions();
    this.updateLivingCreatures();

    let doveCount = this.livingCreatures.filter(e=>e.isDove === true).length
    let hawkCount = this.livingCreatures.length - doveCount;
    this.days.push({
      creatures: this.livingCreatures.length,
      doves: `${doveCount} (${Math.round((doveCount/this.livingCreatures.length)*100)}%)`,
      hawks: `${hawkCount} (${Math.round((hawkCount/this.livingCreatures.length)*100)}%)`,
      doveToHawkRatio: Math.round(doveCount/hawkCount),
      totalCreatureCount: this.creatures.length
    });
  }
  updateLivingCreatures(){
    this.livingCreatures = this.creatures.filter(e=>e.isAlive === true);
  }
  setNewDays(){
    this.livingCreatures.forEach(e=>{
      e.days.push({
        isDove: e.isDove
      });
    });
  }
  spawnFoodPods(count){
    this.foodPods = [];
    for(let i=0;i<count;i++){
      this.foodPods.push(new FoodPod(this.foodPodFoodQuantity));
    }
  }
  findFood(){
    this.livingCreatures.sort(() => Math.random() - 0.5);
    this.livingCreatures.forEach(e=>{
      let choice = Math.floor((Math.random()*this.foodPods.length));
      this.foodPods[choice].introduceCreature(e);
    });
  }
  compete(){
    this.foodPods.forEach(e=>{
      e.compete();
    });
  }
  survive(){
    this.livingCreatures.forEach(e=>{
      e.survive();
    });
  }
  reproduce(){
    this.livingCreatures.forEach(e=>{
      e.reproduce();
      if(e.reproduced){
        let newCreature = new Creature();
        newCreature.parent = e;
        this.creatures.push(newCreature);
        e.children.push(newCreature);
      }
    });
  }
  runConversions(){
    this.livingCreatures.forEach(e=>{
      e.runConversion();
    });
  }
}

module.exports = Scenario;