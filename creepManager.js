/* creepManager.js
 * creepManager.getSpawning(creep) -- reads memory to check if a creep is still spawning
 * creepManager.setSpawning(creep,val) -- sets memory of a creep if it is spawning or not (val)
 * creepManager.creepExists(creepType, creepID) -- returns true/false if a creep exists with given ID of given type
 * creepManager.nextCreepName(creepType) -- returns the next available unique creep name based on type
 * creepManager.roleActions() -- makes each creep perform their role action
 * creepManager.spawnCreep.role(spawnName,creepName,level) -- spawns a creep with a role (replace role with a role type ex builder)
 */
 var harvester = require('harvester');
 var builder = require('builder');
 var guard = require('guard');
 var medic = require('medic');
 exports.spawnCreep = require('spawnCreep');
 exports.getSpawning = function(creep){
     if(Memory.creeps[creep].spawning === true){
         return true;
     }else{
         return false;
     }
 }
 exports.setSpawning = function(creep,val){
     Memory.creeps[creep].spawning = val;
     return "complete"
 }
 exports.roleActions = function() {
     for(var creepName in Game.creeps) {
    	var creep = Game.creeps[creepName];
        if(creep.memory.role == 'guard'){
            guard.defend(creep);
        }
    	if(creep.memory.role =='harvester') {
    		harvester.harvest(creep);
    	}
    	if(creep.memory.role == 'builder') {
    	    builder.build(creep);
    	}
        if(creep.memory.role === 'medic'){
            medic.healNearestGuard(creep);
        }
    }
    return "complete"
 }
