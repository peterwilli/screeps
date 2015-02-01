/* builder.js
 * guard.spawn(spawnName, creepName, level)   -- calls spawnCreep for a builder
 * guard.build(creep) -- performs role of building next construction site
 */
 var spawnCreep = require('spawnCreep');
  exports.spawn = function(spawnName, creepName,level){
      spawnCreep.builder(spawnName, creepName, level);
  }
  exports.build = function (creep) {
        if(creep.energy === 0) {
            
			creep.moveTo(Game.spawns[creep.memory.parentSpawn]);
			Game.spawns[creep.memory.parentSpawn].transferEnergy(creep);
		}
		else {
		    var neartarget = creep.pos.findNearest(Game.CONSTRUCTION_SITES);
        	if(neartarget) {
        		creep.moveTo(neartarget);
	        	creep.build(neartarget);
    	    }
		}
  }