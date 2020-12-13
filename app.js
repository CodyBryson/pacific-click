//global variables
let level = 1;
let jaegerHealth = 100;
let kaijuCores = 0;
let kaijuHealth = 100;

let clickCount = 0;

let defaultDamage = 10;
let upgradeMultiplier = 0;
let automissileTotal = 0;
let regenTotal = 0;

//Upgrade Dictionary
let autoUpgrades = {
  missiles: {
    price: 5,
    quantity: 0,
    multiplier: 20
  }
};
let shootUpgrades = {
  computer: {
    price: 1,
    quantity: 0,
    multiplier: 5
  }
};
let reactorUpgrades = {
  reactor: {
    price: 10,
    quantity: 0,
    mutiplier: 5
  }
};
let healthUpgrades = {
  health: {
    price: 10,
    quantity: 0,
    multiplier: 5
  }
};


function buyMissile() {
  if (kaijuCores >= autoUpgrades.missiles.price) {
    kaijuCores -= autoUpgrades.missiles.price;
    autoUpgrades.missiles.price += 10;
    autoUpgrades.missiles.quantity++;
  }
}
function buyComputer() {
  if (kaijuCores >= shootUpgrades.computer.price) {
    kaijuCores -= shootUpgrades.computer.price;
    upgradeMultiplier += shootUpgrades.computer.multiplier;
    shootUpgrades.computer.price += 5;
    shootUpgrades.computer.quantity++;
  }
}
function buyReactor() {
  if (kaijuCores >= reactorUpgrades.reactor.price) {
    kaijuCores -= reactorUpgrades.reactor.price;
    reactorUpgrades.reactor.price += 10;
    reactorUpgrades.reactor.quantity++;
  }
}
function buyHealth() {
  if (kaijuCores >= healthUpgrades.health.price) {
    kaijuCores -= healthUpgrades.health.price;
    jaegerHealth += healthUpgrades.health.multiplier;
    healthUpgrades.health.price *= 2;
    healthUpgrades.health.multiplier *= 2;
    healthUpgrades.health.quantity++;
  }
}
function shoot() {
  kaijuHealth -= (defaultDamage + upgradeMultiplier)
  console.log(kaijuHealth)
}
function collectMissile() {
  let autoTotal = 0;
  autoTotal += (autoUpgrades.missiles.multiplier * autoUpgrades.missiles.quantity);
  autoMissileTotal = autoTotal;
  kaijuHealth -= autoTotal;
  return autoTotal;
}
function startmissileInterval() {
  var autoInterval = setInterval(collectMissile, 3000);

}
function collectReactor() {
  let regenTotal = 0;
  regenTotal += (reactorUpgrades.reactor.multiplier * reactorUpgrades.reactor.quantity);
  autoRegenTotal = regenTotal;
  jaegerHealth += regenTotal;
  return regenTotal;
}
function startregenInterval() {
  var regenInterval = setInterval(collectReactor, 3000);
}
function kaijuDeath() {
  if (kaijuHealth <= 0) {
    kaijuCores++;
    if ((level % 5) == 0) {
      drawCategoryFive()
    }
    else {
      drawKaiju()
    }
    // draws new random kaiju with increased stats
  }
}
function statUpdate() {
  let levelElem = document.getElementById("level");
  levelElem.innerText = level.toString();
  //increases level number
  let kaijucoresElem = document.getElementById("k-cores");
  kaijucoresElem.innerText = kaijuCores.toString();
  //increases kaiju cores number
  let jaegerhealthElem = document.getElementById("j-health");
  jaegerhealthElem.innerText = jaegerHealth.toString()
  //refreshes Jaeger Health
  let computercostElem = document.getElementById("comp-cost");
  computercostElem.innerText = shootUpgrades.computer.price.toString();
  let computertotalElem = document.getElementById("comp-total");
  computertotalElem.innerText = shootUpgrades.computer.quantity.toString();
  //updates computer cost and quantity
  let missilecostElem = document.getElementById("miss-cost");
  missilecostElem.innerText = autoUpgrades.missiles.price.toString();
  let missiletotalElem = document.getElementById("miss-total");
  missiletotalElem.innerText = autoUpgrades.missiles.quantity.toString();
  //updates missile cost and quantity
  let reactorcostElem = document.getElementById("react-cost");
  reactorcostElem.innerText = reactorUpgrades.reactor.price.toString();
  let reactortotalElem = document.getElementById("react-total");
  reactortotalElem.innerText = reactorUpgrades.reactor.quantity.toString();
  //updates reactor cost and quantity
  let healthcostElem = document.getElementById("health-cost");
  healthcostElem.innerText = healthUpgrades.health.price.toString();
  let healthtotalElem = document.getElementById("health-total");
  healthtotalElem.innerText = healthUpgrades.health.quantity.toString();
  //updates maintenence cost and quantity

}


startmissileInterval();
startregenInterval();
statUpdate()