const { getRandom } = require("./utils");

/**
 * Orderus class definition
 */

class Orderus {
  health;
  strength;
  defence;
  speed;
  luck;
  //
  rapidStrike;
  magicShield;

  static heroStats = {
    health: [70, 100],
    strength: [70, 80],
    defence: [45, 55],
    speed: [40, 50],
    luck: [10, 30],
    rapidStrike: 10,
    magicShield: 20,
  };

  constructor() {
    // populate orderus stats
    // at object creation
    this.health = getRandom(
      Orderus.heroStats.health[0],
      Orderus.heroStats.health[1]
    );
    this.strength = getRandom(
      Orderus.heroStats.strength[0],
      Orderus.heroStats.strength[1]
    );
    this.defence = getRandom(
      Orderus.heroStats.defence[0],
      Orderus.heroStats.defence[1]
    );
    this.speed = getRandom(
      Orderus.heroStats.speed[0],
      Orderus.heroStats.speed[1]
    );
    this.luck = getRandom(Orderus.heroStats.luck[0], Orderus.heroStats.luck[1]);
  }

  getHealth() {
    return this.health;
  }

  getDefence() {
    return this.defence;
  }

  getSpeed() {
    return this.speed;
  }

  getLuck() {
    return this.luck;
  }

  /**
   * Stats that are generated at every invokation
   */
  isLucky() {
    return getRandom(0, this.getLuck()) === this.getLuck();
  }

  getRapidstrike() {
    return (
      getRandom(0, Orderus.heroStats.rapidStrike) ===
      Orderus.heroStats.rapidStrike
    );
  }

  getMagicshield() {
    return (
      getRandom(0, Orderus.heroStats.magicShield) ===
      Orderus.heroStats.magicShield
    );
  }
  /**
   * ENDOF
   * Stats that are generated at every invokation
   */

  isMagicShield() {
    return this.magicShield;
  }

  setHealth(health) {
    this.health = health;
  }

  doAttack(beastLucky, beastDefence) {
    // This time the beast is lucky
    if (beastLucky) {
      return 0;
    }

    const damage = this.strength - beastDefence;

    // if Orderus has rapid strike
    // it strikes is twice more effective
    if (this.getRapidstrike()) {
      return damage + this.doAttack(beastLucky, beastDefence);
    }

    return damage;
  }
}

exports.Orderus = Orderus;
