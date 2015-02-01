/* harvester.js
 * harvester.spawn(spawnName, creepName)    --- spawnName is name of spawn, harvesterName will be calculated (ex harvester1)
 * harvester.harvest(creep) --- makes creep search for the nearest energy block and harvest it.
 */
 exports.harvest = function (creep) {

	if(creep.energy < creep.energyCapacity) {
	    var source = creep.pos.findNearest(Game.SOURCES, {
    		filter: function(object) {
        		return object.energy > 0;
    		}
		});
		if(!creep.memory.mineSource){
		    creep.memory.mineSource = source.id;
		    console.log(creep.name + " will mine source: " + source.id)
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