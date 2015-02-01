/* medic.js
 * medic.heal(creep) -- sends creep to nearest guard that is damaged and heals them
 */
 var _ = require('lodash');
 exports.healNearestGuard = function(creep){
    if(creep.memory.role === 'medic') {
	    var guards = _.filter(Game.creeps, {
    		memory: {role: 'guard'}
		});
		var guardNeedsHealing = creep.pos.findNearest(Game.MY_CREEPS, {
		    filter: function(object) {
		        return object.memory.role == "guard" && object.hits < object.hitsMax;
		    }
		});
		var nearestGuard = creep.pos.findNearest(Game.MY_CREEPS, {
		    filter: function(object) {
		        return object.memory.role == "guard";
		    }
		});
		var nearestMedic = creep.pos.findNearest(Game.MY_CREEPS, {
		    filter: function(object) {
		        return object.memory.role == "medic";
		    }
		});
    	if(guardNeedsHealing) {
			console.log(guardNeedsHealing.name + " needs to be healed. Sending " + creep.name)
			creep.moveTo(guardNeedsHealing);
    		creep.heal(guardNeedsHealing);
	    }else{
	    	if(Memory.count.total.guard > 0 && Memory.count.enemies > 0){
	    		if(nearestGuard){
	    			creep.moveTo(nearestGuard);
	    			console.log("Sending " + creep.name + " to assist " + nearestGuard.name)
	    		}
	    	}else{
	    		if(nearestMedic){
		    		if(nearestMedic.hits < nearestMedic.hitsMax){
		    			creep.moveTo(nearestMedic);
	    				creep.heal(nearestMedic);
	    			}
	    		}else{
	    			this.healSpawn(creep);
	    		}
			}
		}
    }
 }
 exports.healSpawn = function(creep){
 	if(creep.memory.role === 'medic'){
 		if(creep.memory.parentSpawn){
 		var parentSpawn = Game.spawns[creep.memory.parentSpawn]
 		if(parentSpawn.hits < parentSpawn.hitsMax){
 			console.log(parentSpawn.name + " needs to be healed. Sending " + creep.name)
 			creep.moveTo(parentSpawn);
 			creep.heal(parentSpawn);
 		}else{
 			console.log(parentSpawn.name + " is at full health.")
 		}
 	}
 	}
 }