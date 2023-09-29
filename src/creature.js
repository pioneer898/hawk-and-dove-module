const isSuccessful = require('./random');
const { v4: uuidv4 } = require('uuid');

class Creature{
  id = uuidv4();
  isDove = true;
  isAlive = true;
  fightWins = 0;
  food = 0;
  reproduced = false;
  days = [];
  children = [];
  doveToHawkDays = 3;
  hawkExperienceBonus = 15;
  chanceToDieFromFight = 0.5;
  
  constructor(params){
    this.doveToHawkDays = params.doveToHawkDays;
    this.hawkExperienceBonus = params.hawkExperienceBonus;
    this.chanceToDieFromFight = params.chanceToDieFromFight;
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
    let won = false;
    if(this.fightWins > opponent.fightWins && isSuccessful(Math.min(100,50+this.hawkExperienceBonus))){
      won = true;
    } else if (this.fightWins < opponent.fightWins && isSuccessful(Math.max(0,50-this.hawkExperienceBonus))){
      won = true;
    } else if (isSuccessful(50)){
      won = true;
    }

    if(won){
      this.fightWins++;
      opponent.killedBy(this);
      if(isSuccessful(this.chanceToDieFromFight)){
        this.die();
      }
    } else {
      opponent.fightWins++;
      this.killedBy(opponent);
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
    if(this.days.length === 0){
      return;
    }
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
    return this.days.slice(this.doveToHawkDays*-1).filter(e=>e.sharedFood === true).length === this.doveToHawkDays;
  }
  shouldConvertToDove(){
    // if(this.parent){
    //   return typeof(this.currentDay().parentKilled) != 'undefined';
    // }
    return false;
  }
}

module.exports = Creature;