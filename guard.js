/* guard.js
 * guard.spawn(spawnName, creepName, level)   -- calls spawnCreep for a guard
 * guard.defend(creep) -- performs role of defending nearest hostilecreep
 */
 exports.defend = function(creep){
    if(creep.memory.role == 'guard') {
	    var neartarget = creep.pos.findNearest(Game.HOSTILE_CREEPS);
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
    	if(neartarget) {
    		creep.moveTo(neartarget);
    		if(creep.pos.inRangeTo(neartarget,1)){
    			creep.attack(neartarget);
    		}else if(creep.pos.inRangeTo(neartarget,3)){
    			creep.rangedAttack(neartarget);
    		}
	    }else{
	    	if(creep.hits < creep.hitsMax){
	    		creep.moveTo(nearestMedic);
	    	}else if(nearestGuard){
	    		creep.moveTo(nearestGuard);
	    	}
	    }
	    
    }
 }