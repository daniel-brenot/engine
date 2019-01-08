var q = require('q'),
    _ = require('lodash'),
    utils = require('../../../utils'),
    driver = utils.getDriver(),
    C = driver.constants;

module.exports = function(intent, user, {userPowerCreeps, bulkUsersPowerCreeps}) {

    var powerLevel = Math.floor(Math.pow((user.power || 0) / C.POWER_LEVEL_MULTIPLY, 1 / C.POWER_LEVEL_POW));
    var used = Object.keys(userPowerCreeps).length + _.sum(userPowerCreeps, 'level');
    if(used >= powerLevel) {
        return;
    }

    if(Object.values(C.POWER_CLASS).indexOf(intent.className) === -1) {
        return;
    }

    var name = intent.name.substring(0,50);

    if(_.any(userPowerCreeps, {name})) {
        return;
    }

    bulkUsersPowerCreeps.insert({
        name,
        className: intent.className,
        user: ""+user._id,
        level: 0,
        hitsMax: 1000,
        energyCapacity: 100,
        spawnCooldownTime: 0,
        powers: {}
    });
};