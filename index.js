// Game entrypoint
const Orderus = require("./Orderus").Orderus;
const Beast = require("./Beast").Beast;

const MAX_BATTLE_TURNS = 20;

// Game class definition
class Game {
  constructor() {
    this.startGame();
  }

  startGame() {
    // Players instances
    this.orderus = new Orderus();
    this.beast = new Beast();
    // Decides who starts first
    this.orderusStarts = this.whoStarts();
    // Number of turns within a battle
    let currentTurn = 0;

    // Main battle loop
    while (
      currentTurn < MAX_BATTLE_TURNS &&
      this.orderus.getHealth() > 0 &&
      this.beast.getHealth() > 0
    ) {
      currentTurn++;
      // Individually turn
      this.doBattle();
    }

    // End of game
    console.log(`GAME OVER!`);
    console.log(
      `THE WINNER IS: ${
        this.orderus.getHealth() > this.beast.getHealth()
          ? "Orderus"
          : "The beast"
      }`
    );
  }

  doBattle() {
    // Check whos the first player
    if (this.orderusStarts === 0) {
      // do an ataack against the enemy
      const damage = this.orderus.doAttack(
        this.beast.isLucky(),
        this.beast.getDefence()
      );
      // Update the enemy healt after an atack
      const newHealth = this.beast.getHealth() - damage;
      this.beast.setHealth(newHealth);
      // Reverse the attack order
      this.orderusStarts = 1;

      // Logs turn result
      console.log(`Orderus do attack`);
      console.log(`Beast damage: ${damage}`);
      console.log(`Beast health: ${newHealth}`);
      console.log(`------------------------------------`);
    } else {
      // do an ataack against the enemy
      const damage = this.beast.doAttack(
        this.orderus.isLucky(),
        this.orderus.getDefence(),
        this.orderus.isMagicShield()
      );

      // Update the enemy healt after an atack
      const newHealth = this.orderus.getHealth() - damage;
      this.orderus.setHealth(newHealth);
      // Reverse the attack order
      this.orderusStarts = 0;

      // Logs turn result
      console.log(`Beast do attack`);
      console.log(`Orderus damage: ${damage}`);
      console.log(`Orderus health: ${newHealth}`);
      console.log(`------------------------------------`);
    }
  }

  whoStarts() {
    if (this.orderus.getSpeed() !== this.beast.getSpeed()) {
      // starts by speed
      if (this.orderus.getSpeed() > this.beast.getSpeed()) {
        return 0;
      } else {
        return 1;
      }
    } else if (this.orderus.getLuck() !== this.beast.getLuck()) {
      // starts by luck
      if (this.orderus.getLuck() > this.beast.getLuck()) {
        return 0;
      } else {
        return 1;
      }
    } else {
      // The criteria is not fulfiled.
      // Generate new states
      this.startGame();
    }
  }
}

/**
 * Game entrypoint
 * Simply instantiate Game class
 */
new Game();
