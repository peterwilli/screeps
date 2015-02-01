/* spawnCreep.js
 * see creepManager for use
 */
 var spawnCost = require('spawnCost');
 var creepLevel = require('creepLevel');
 //var creepManager = require('creepManager');
 exports.creepExists = function(creepType, creepID){
     var creepName = creepType+creepID;
     if(Game.creeps[creepName]){
         return true;
     }else{
         return false;
     }
 };
  exports.nextCreepName = function(creepType){
    var creepID = 0;
    var f = false;
    while ( f === false) {
        if(this.creepExists(creepType,creepID) === false){
            var creepName = creepType + creepID;
            return creepName;
            f = true;
        }else{
            creepID += 1; 
        }
    }
 };
exports.builder = function(spawnName, level){
    if(Game.spawns[spawnName]){
        if(Game.spawns[spawnName].energy >= spawnCost.builder(level)){
            var creepName = Game.spawns[spawnName].createCreep(  creepLevel.getParts("builder",level), this.nextCreepName("builder"), {'role':'builder', 'parentSpawn':spawnName, 'spawning':true} );
            Game.spawns[spawnName].memory.children.created += 1;
            console.log(spawnName + " is spawning " + creepName);
        }else{
            console.log("ERROR: " + spawnName + " has " + Game.spawns[spawnName].energy + "/" + spawnCost.builder(level) + "energy to spawn builder");
        }
    }else{
        console.log("ERROR: spawnCreep.builder: " + spawnName + " doesn't exist!");
    }
};
exports.medic = function(spawnName, level){
    if(Game.spawns[spawnName]){
        if(Game.spawns[spawnName].energy >= spawnCost.medic(level)){
            var creepName = Game.spawns[spawnName].createCreep(  creepLevel.getParts("medic",level), this.nextCreepName("medic"), {'role':'medic', 'parentSpawn':spawnName, 'spawning':true} );
            Game.spawns[spawnName].memory.children.created += 1;
            console.log(spawnName + " is spawning " + creepName);
        }else{
            console.log(spawnName + " has " + Game.spawns[spawnName].energy + "/" + spawnCost.medic(level) + " energy to spawn medic");
        }
    }else{
        console.log("ERROR: spawnCreep.medic: " + spawnName + " doesn't exist!");
    }
};
exports.harvester = function(spawnName, level){
    if(Game.spawns[spawnName]){
        if(Game.spawns[spawnName].energy >= spawnCost.harvester(level)){
            var creepName = Game.spawns[spawnName].createCreep( creepLevel.getParts("harvester",level), this.nextCreepName("harvester"), {'role':'harvester', 'parentSpawn':spawnName, 'spawning':true} );
            Game.spawns[spawnName].memory.children.created += 1;
            console.log(spawnName + " is spawning " + creepName);
        }else{
            console.log(spawnName + " has " + Game.spawns[spawnName].energy + "/" + spawnCost.harvester(level) + " energy required to spawn harvester");
        }
    }else{
        console.log("ERROR: spawnCreep.harvester: " + spawnName + " doesn't exist!");
    }
};
exports.guard = function(spawnName, level){
    if(Game.spawns[spawnName]){
        if(Game.spawns[spawnName].energy >= spawnCost.guard(level)){
            var creepName = Game.spawns[spawnName].createCreep( creepLevel.getParts("guard",level), this.nextCreepName("guard"), {'role':'guard','parentSpawn':spawnName, 'spawning':true} );
            Game.spawns[spawnName].memory.children.created += 1;
            console.log(spawnName + " is spawning " + creepName);
        }else{
            console.log(spawnName + " has " + Game.spawns[spawnName].energy + "/" + spawnCost.guard(level) + " energy required to spawn guard");
        }
    }else{
        console.log("ERROR: spawnCreep.guard: " + spawnName + " doesn't exist!");
    }
};