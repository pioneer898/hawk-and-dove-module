class FoodPod{
  foodQuantity;
  creatures = [];
  constructor(foodQuantity){
    this.foodQuantity = foodQuantity;
  }
  introduceCreature(creature){
    this.creatures.push(creature);
    let hawks = this.creatures.filter(e=>e.isAlive === true && e.isDove === false);
    if(hawks.length > 1){
      hawks[0].fightWith(hawks[1]);
    }
  }
  compete(){
    let creatureCount = this.creatures.filter(e=>e.isAlive === true).length;
    if(!creatureCount){
      return;
    }
    let hawk = this.creatures.find(e=>e.isAlive === true && e.isDove === false);
    let doves = this.creatures.filter(e=>e.isAlive === true && e.isDove === true);
    let sharedFood = (creatureCount > 1);

    if(hawk){
      hawk.food = 1;
      this.foodQuantity = this.foodQuantity-1;
    }
    let hawkShare = Math.min(this.foodQuantity/creatureCount,1);
    let doveShare = Math.min(this.foodQuantity/creatureCount,2);
    if(hawk){
      hawk.currentDay().sharedFood = sharedFood;
      hawk.food += hawkShare;
      if(doves){
        hawk.currentDay().dominatedFoodShare = true;
      }
      this.foodQuantity -= hawkShare;
    }
    doves.forEach(e=>{
      e.currentDay().sharedFood = sharedFood;
      e.food += doveShare;
      this.foodQuantity -= doveShare;
    });
  }
}

module.exports = FoodPod;