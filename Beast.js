const { getRandom } = require("./utils");

/**
 * Beast class definition
 */
class Beast {
  health;
  strength;
  defence;
  speed;
  luck;

  static heroStats = {
    health: [60, 90],
    strength: [60, 90],
    defence: [40, 60],
    speed: [40, 60],
    luck: [25, 40],
  };

  constructor() {
    // populate beast stats
    // at object creation
    this.health = getRandom(
      Beast.heroStats.health[0],
      Beast.heroStats.health[1]
    );
    this.strength = getRandom(
      Beast.heroStats.strength[0],
      Beast.heroStats.strength[1]
    );
    this.defence = getRandom(
      Beast.heroStats.defence[0],
      Beast.heroStats.defence[1]
    );
    this.speed = getRandom(Beast.heroStats.speed[0], Beast.heroStats.speed[1]);
    this.luck = getRandom(Beast.heroStats.luck[0], Beast.heroStats.luck[1]);
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

  /**
   * ENDOF
   * Stats that are generated at every invokation
   */

  setHealth(health) {
    this.health = health;
  }

  doAttack(orderusLucky, orderusDefence, orderusMagicShield) {
    // This time Orderus is lucky
    if (orderusLucky) {
      return 0;
    }

    const damage = this.strength - orderusDefence;

    // if Orderus has magic shield enabled
    // it suffers half less
    return orderusMagicShield ? damage / 2 : damage;
  }
}

exports.Beast = Beast;
