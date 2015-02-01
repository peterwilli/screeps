/* hauler.js
 * hauler.haul(creep) --- makes creep search for the nearest energy block and haul it.
 */
 exports.harvest = function (creep) {
 	var parentSpawn = Game.spawns[creep.memory.parentSpawn]
	if(creep.energy < creep.energyCapacity) {
	    var harvester = creep.pos.findNearest(Game.MY_CREEPS, {
    		filter: function(object) {
        		return object.memory.role === "harvester" && object.memory.parentSpawn === creep.memory.parentSpawn && object.energy > 0;
    		}
		});
		var freeEnergy = creep.pos.findNearest(Game.DROPPED_ENERGY, {
    		filter: function(object) {
        		return object.energy > 25;
    		}
		});
		if(harvester && !freeEnergy){
			creep.moveTo(harvester);
		}else if(freeEnergy){
			creep.moveTo(freeEnergy);
		}else{
			if(creep.energy > 0){
				creep.moveTo(parentSpawn)
			}
			creep.moveTo
		}

		//Add checks to compare if any enemies are in the regions surrounding
        creep.moveTo(source);
        creep.harvest(source);
	}
	else {
	    var parentSpawn = Game.spawns[creep.memory.parentSpawn]
		creep.moveTo(parentSpawn)
		creep.transferEnergy(parentSpawn);
	}
};