function isSuccessful(pctChance){
    return (pctChance > Math.floor(Math.random()*100));
}

module.exports = isSuccessful;