/* spawnCost.js
 * spawnCost.getCost(parts) -- returns cost of body parts in array
 * spawnCost.builder(level) -- returns cost in energy to build each level of a creep
 * MOVE = 50
 * WORK = 20
 * CARRY = 50
 * ATTACK = 100
 * TOUGH = 5
 */
var creepLevel = require('creepLevel');
exports.getCost = function(parts){
    var sum = 0;
    var costs = {};
    costs[Game.MOVE] = 50; 
    costs[Game.WORK] = 20; 
    costs[Game.CARRY] = 50;
    costs[Game.ATTACK] = 100;
    costs[Game.RANGED_ATTACK] = 150;
    costs[Game.HEAL] = 200;
    costs[Game.TOUGH] = 5;
    if(parts.length){
        for (var i in parts) {
            sum += costs[parts[i]];
        }
    }
    return sum;
}
exports.builder = function(level){
    return this.getCost(creepLevel.getParts("builder",level));
};
exports.harvester = function(level){
    return this.getCost(creepLevel.getParts("harvester",level));
};
exports.guard = function(level){
    return this.getCost(creepLevel.getParts("guard",level));
};
exports.medic = function(level){
    return this.getCost(creepLevel.getParts("medic",level));
}
