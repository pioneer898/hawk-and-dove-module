const isSuccessful = require('./random');
const { v4: uuidv4 } = require('uuid');

class Creature{
  id;
  isDove = true;
  isAlive = true;
  fightWins = 0;
  food = 0;
  reproduced = false;
  days = [];
  children = [];
  
  constructor(){
    this.id = uuidv4();
  }
  currentDay(){
    return this.days[this.days.length-1];
  }
  survive(){
    if(this.food >= 1){
      this.food--;
      return;
    }
    let survived = isSuccessful(this.food*100);
    if(survived){
      this.food = 0;
    } else {
      this.die();
    }
  }
  reproduce(){
    if(this.food >= 1){
      this.food--;
      this.reproduced = true;
    } else {
      this.reproduced = isSuccessful(this.food*100);
      this.food == 0;
    }
    this.currentDay().reproduced = this.reproduced;
  }
  fightWith(opponent){
    this.currentDay().foughtCreature = opponent.id;
    opponent.currentDay().foughtCreature = this.id;
    let success;
    if(this.fightWins > opponent.fightWins){
      success = isSuccessful(65);
      if(success){
        this.fightWins++;
        opponent.killedBy(this);
        return;
      } else {
        opponent.fightWins++;
        this.killedBy(opponent);
        return;
      }
    }
    if(this.fightWins < opponent.fightWins){
      success = isSuccessful(35);
      if(success){
        this.fightWins++;
        opponent.killedBy(this);
        return;
      } else {
        opponent.fightWins++;
        this.killedBy(opponent);
        return;
      }
    }
    success = isSuccessful(50);
    if(success){
      this.fightWins++;
      opponent.killedBy(this);
      return;
    } else {
      opponent.fightWins++;
      this.killedBy(opponent);
      return;
    }
  }
  killedBy(killer){
    this.currentDay().killedBy = killer;
    this.children.forEach(e=>{
      e.currentDay().parentKilled = true;
    })
    this.die();
  }
  die(){
    this.currentDay().died = true;
    this.isAlive = false;
  }
  runConversion(){
    if(this.isDove && this.shouldConvertToHawk()){
      this.isDove = false;
      this.currentDay().convertedToHawk = true;
    }
    if(this.isDove === false && this.shouldConvertToDove()){
      this.isDove = true;
      this.currentDay().convertedToDove = true;
    }
  }
  shouldConvertToHawk(){
    return this.days.slice(-3).filter(e=>e.sharedFood === true).length === 3;
  }
  shouldConvertToDove(){
    // if(this.parent){
    //   return typeof(this.currentDay().parentKilled) != 'undefined';
    // }
    return false;
  }
}

module.exports = Creature;