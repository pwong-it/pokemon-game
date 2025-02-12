// to start
function setStats() {
  if (battleStarted === false) {
    player["currentHealth"] = state.playerPokemonToBattle.hp
    opponent["currentHealth"] = state.opponentPokemon.hp

    player["pokemon"] = state.playerPokemonToBattle
    player["moveToUse"] = state.playerPokemonToBattle.moves[0]
    opponent["pokemon"] = state.opponentPokemon
    opponent["moveToUse"] = state.opponentPokemon.moves[0]
  }
  battleStarted = true
}

// not built yet - take user back to home screen. 
// use let winner === for the modal at the end!
function clickToEndFight() {
  battleToContinue = true
  battleStarted = false
}

function speedCheck() {
  if (opponent.pokemon.speed > player.pokemon.speed) {
    playerToAttack = 'opponent'
    const battleLogSpeed = document.createElement('p');
    battleLogSpeed.innerHTML = `${opponent.pokemon.name} has the faster attack speed and attacks ${player.pokemon.name} first....`;
    document.querySelector('.battleLog').appendChild(battleLogSpeed)
  } if (opponent.pokemon.speed <= player.pokemon.speed) {
    playerToAttack = 'player'
    const battleLogSpeed = document.createElement('div');
    battleLogSpeed.innerHTML = `${player.pokemon.name} has the faster attack speed and attacks ${opponent.pokemon.name} first....`;
    document.querySelector('.battleLog').appendChild(battleLogSpeed)
  }
}



function playerAttackOpponent() {
  var battlelog = document.querySelector('.battleLog')
  battlelog.scrollTop = battlelog.scrollHeight

  player.damageDelt = Math.floor(Math.random() * player.pokemon.attack)
  setPlayerMove()
  player.damageDelt = Math.floor(player.damageDelt * player.damageMultiplier)

  const battleLogStrike = document.createElement('div')
  battleLogStrike.innerHTML = `${player.pokemon.name} used <span style='color:black;font-size:1rem' >${player.moveToUse}</span> and produced ${player.damageDelt} damage`
  document.querySelector('.battleLog').appendChild(battleLogStrike)

  applyPlayerDamage()
}


function OpponentAttackPlayer() {
  var battlelog = document.querySelector('.battleLog')
  battlelog.scrollTop = battlelog.scrollHeight

  opponent.damageDelt = Math.floor(Math.random() * opponent.pokemon.attack)
  setOppositionMove()
  opponent.damageDelt = Math.floor(Math.random() * opponent.pokemon.attack)

  const battleLogStrike = document.createElement('p')
  battleLogStrike.innerHTML = `${opponent.pokemon.name} used <span style='color:black;font-size:1rem'>${opponent.moveToUse}</span> and produced ${opponent.damageDelt} damage`
  document.querySelector('.battleLog').appendChild(battleLogStrike)

  applyOpponentDamage()
  //   player.currentHealth = player.currentHealth - opponent.damageDelt
}

function checkIfPlayerWon() {
  var battlelog = document.querySelector('.battleLog')
  battlelog.scrollTop = battlelog.scrollHeight

  if (player.currentHealth < 1) {
    const battleLogPlayerWin = document.createElement('p');
    battleLogPlayerWin.innerHTML = `${player.pokemon.name} has fainted! ${opponent.pokemon.name} wins the battle!`;
    document.querySelector('.battleLog').appendChild(battleLogPlayerWin);
    console.log('winner opponent');
    winner = 'opponent'
    battleToContinue = false;
    revealBtn('to-party-btn')
    return battleToContinue
  }
}

function checkIfOpponentrWon() {
  var battlelog = document.querySelector('.battleLog')
  battlelog.scrollTop = battlelog.scrollHeight
  if (opponent.currentHealth < 1) {
    const battleLogOpponentWin = document.createElement('div');
    battleLogOpponentWin.innerHTML = `${opponent.pokemon.name} has fainted! ${player.pokemon.name} wins the battle!`;
    document.querySelector('.battleLog').appendChild(battleLogOpponentWin);
    console.log('winner player');
    winner = 'player'
    battleToContinue = false;
    revealBtn('to-party-btn')
    return battleToContinue
  }
}

function applyOpponentDamage() {
  var battlelog = document.querySelector('.battleLog')
  battlelog.scrollTop = battlelog.scrollHeight

  // Damage to Player
  player.damageSaved = Math.floor(Math.floor(Math.random() * player.pokemon.defense) / 1.3)

  let dmgToPlayer = Math.floor(player.damageDelt - player.damageSaved)
  if (dmgToPlayer < 0) {
    dmgToPlayer = 0
    const battleLogStrike = document.createElement('div');
    battleLogStrike.innerHTML = `${player.pokemon.name}'s defense is too strong and blocked ALL damage!`
    document.querySelector('.battleLog').appendChild(battleLogStrike)
  } else {
    const battleLogStrike = document.createElement('div');
    battleLogStrike.innerHTML = `${player.pokemon.name} defended ${player.damageSaved} damage. ${player.pokemon.name} recieved a total of ${dmgToPlayer} damage.`
    document.querySelector('.battleLog').appendChild(battleLogStrike)

    player.currentHealth -= dmgToPlayer

    if (player.currentHealth < 0) {
      player.currentHealth = 0
    }

    document.querySelector('.numericalPlayerHealth').innerHTML = player.currentHealth
    document.querySelector('#player-health').value = player.currentHealth
  }
}



function applyPlayerDamage() {
  var battlelog = document.querySelector('.battleLog')
  battlelog.scrollTop = battlelog.scrollHeight

  //Player Damage to Opponent
  opponent.damageSaved = Math.floor(Math.floor(Math.random() * opponent.pokemon.defense) / 1.3)

  let dmgToOpponent = Math.floor(opponent.damageDelt - opponent.damageSaved)
  if (dmgToOpponent < 0) {
    dmgToOpponent = 0
    const battleLogStrike = document.createElement('p');
    battleLogStrike.innerHTML = `${opponent.pokemon.name}'s defense is too strong and blocked ALL damage!`
    document.querySelector('.battleLog').appendChild(battleLogStrike)

  } else {
    const battleLogStrike = document.createElement('p');
    battleLogStrike.innerHTML = `${opponent.pokemon.name} defended ${opponent.damageSaved} damage. ${opponent.pokemon.name} recieved a total of ${dmgToOpponent} damage.`
    document.querySelector('.battleLog').appendChild(battleLogStrike)

    opponent.currentHealth -= dmgToOpponent

    if (opponent.currentHealth < 0) {
      opponent.currentHealth = 0
    }

    document.querySelector('.numericalOpponentHealth').innerHTML = opponent.currentHealth
    document.querySelector('#opponent-health').value = opponent.currentHealth

    // UPDATE % chance to catch too!
    let healthLost = opponent.pokemon.hp - opponent.currentHealth
    console.log(healthLost);
    if (healthLost > 70) {
      healthLost = 70
    }

    opponent.catchPercent = 20 + healthLost
    console.log(opponent.catchPercent);
    document.querySelector('.percent').innerHTML = opponent.catchPercent

  }
}

function setPlayerMove() {
  let numOf10 = Math.floor(Math.random() * 10)
  if (numOf10 < 5) {
    player.moveToUse = player.pokemon.moves[0]
    player.damageMultiplier = 1
  } if (numOf10 > 4 && numOf10 < 8) {
    player.moveToUse = player.pokemon.moves[1]
    player.damageMultiplier = 1.2
  } if (numOf10 > 7 && numOf10 < 10) {
    player.moveToUse = player.pokemon.moves[2]
    player.damageMultiplier = 1.4
  } if (numOf10 === 10) {
    player.moveToUse = player.pokemon.moves[3]
    player.damageMultiplier = 1.6
  }
}

function setOppositionMove() {
  let numOf10 = Math.floor(Math.random() * 10)
  if (numOf10 < 5) {
    opponent.moveToUse = opponent.pokemon.moves[0]
    opponent.damageMultiplier = 1.
  } if (numOf10 > 4 && numOf10 < 8) {
    opponent.moveToUse = opponent.pokemon.moves[1]
    opponent.damageMultiplier = 1.2
  } if (numOf10 > 7 && numOf10 < 10) {
    opponent.moveToUse = opponent.pokemon.moves[2]
    opponent.damageMultiplier = 1.4
  } if (numOf10 === 10) {
    opponent.moveToUse = opponent.pokemon.moves[3]
    opponent.damageMultiplier = 1.6
  }
}

