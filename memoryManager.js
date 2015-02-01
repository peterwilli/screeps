/* memoryManager.js
 * memoryManager.creepCount() -- returns counts of alive and qued creeps in an object count
 * memoryManager.clearDeadCreeps() -- Clears dead creeps from the memory as to create new ones
 * memoryManager.updateSpawnInfo() -- updates spawn Memory info for each spawn based on current creeps
 * memoryManager.totalCount() -- returns count of all Creeps
 * memoryManager.guardCount() -- returns count of guard Creeps
 * memoryManager.harvesterCount() -- returns count of harvester Creeps
 * memoryManager.builderCount() -- returns count of builder Creeps
 */
var creepManager = require('creepManager');
exports.creepCount = function(){
    var memoryManager = this;
    var count = {
          "alive" : {
            "harvester" : memoryManager.harvesterCount(),
            "guard" : memoryManager.guardCount(),
            "builder" : memoryManager.builderCount(),
            "medic" : memoryManager.medicCount()
          },
          "qued" : {
            "harvester" : memoryManager.queHarvesterCount(),
            "guard" : memoryManager.queGuardCount(),
            "builder" : memoryManager.queBuilderCount(),
            "medic" : memoryManager.queMedicCount()
          },
          "total" : {
            "harvester" : memoryManager.queHarvesterCount() + memoryManager.harvesterCount(),
            "guard" : memoryManager.queGuardCount() + memoryManager.guardCount(),
            "builder" : memoryManager.queBuilderCount() + memoryManager.builderCount(),
            "medic" : memoryManager.medicCount() + memoryManager.queMedicCount()
          },
          "mineSources":memoryManager.sourceCount(),
          "enemies": memoryManager.enemyCount()
         }
    Memory.count = count;
    return count

}
exports.sourceCount = function(){
    var gameRoom = null;
    for(var i in Game.spawns){
        if(gameRoom === null){
            gameRoom = Game.spawns[i].room
        }
    }
    var sources = gameRoom.find(Game.SOURCES)
    var allSourceData = {};
    for(var i in sources){
        var sourceData = {"harvesters":0,"energy":sources[i].energy};
        allSourceData[i] = sourceData
    }
    for(var creepName in Game.creeps){
        var creep = Game.creeps[creepName];
        var mineSource = creep.memory.mineSource;
        if(mineSource){
            allSourceData[i].harvesters +=1
        }
    }
    return allSourceData;
}
exports.totalCount = function(){
    var count = 0;
    for(var i in Game.spawns){
        count += 1;
    }
    return count;
}
exports.harvesterCount = function(){
    var count = 0;
    for(var i in Game.spawns){
        count += Game.spawns[i].memory.children.alive.harvesters;
    }
    return count;
}

exports.queHarvesterCount = function(){
    var count = 0;
    for(var i in Game.spawns){
        count += Game.spawns[i].memory.children.qued.harvesters;
    }
    return count;
}

exports.guardCount = function(){
    var count = 0;
    for(var i in Game.spawns){
        count += Game.spawns[i].memory.children.alive.guards;
    }
    return count;
}
exports.queGuardCount = function(){
    var count = 0;
    for(var i in Game.spawns){
        count += Game.spawns[i].memory.children.qued.guards;
    }
    return count;
}
exports.builderCount = function(){
    var count = 0;
    for(var i in Game.spawns){
        count += Game.spawns[i].memory.children.alive.builders;
    }
    return count;
}
exports.queBuilderCount = function(){
    var count = 0;
    for(var i in Game.spawns){
        count += Game.spawns[i].memory.children.qued.builders;
    }
    return count;
}
exports.medicCount = function(){
    var count = 0;
    for(var i in Game.spawns){
        count += Game.spawns[i].memory.children.alive.medics;
    }
    return count;
}
exports.queMedicCount = function(){
    var count = 0;
    for(var i in Game.spawns){
        count += Game.spawns[i].memory.children.qued.medics;
    }
    return count;
}
exports.enemyCount = function(){
    var enemyCount = 0;
    var spawnSpy;
    for(var x in Game.spawns){
        if(Game.spawns[x]){
            spawnSpy = Game.spawns[x];
        }
    }
    var targets = spawnSpy.room.find(Game.HOSTILE_CREEPS);
    if(targets.length) {
        for(var i in targets){
            enemyCount +=1;
        }   
    }
    return enemyCount;
}
exports.clearDeadCreeps = function(){
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            if(!creepManager.getSpawning(i)){
                console.log("Creep " + i + " dead, removing from memory.");
                delete Memory.creeps[i];
            }
        }else{
            if(creepManager.getSpawning(i)){
                creepManager.setSpawning(i,false);
            }
        }
    }
    return "complete"
}
exports.updateSpawnInfo = function(){
    for(var i in Game.spawns){
        if(!Game.spawns[i].memory.spawnType){
            Game.spawns[i].memory.spawnType = "init";
        }
        if(!Game.spawns[i].memory.spawnQue){
            Game.spawns[i].memory.spawnQue = {};
        }
        if(!Game.spawns[i].memory.spawnUrgetnQue){
            Game.spawns[i].memory.spawnUrgetnQue = {};
        }
        if(!Game.spawns[i].memory.children){
            Game.spawns[i].memory.children = {};
        }
        if(!Game.spawns[i].memory.children.qued){
            Game.spawns[i].memory.children.qued = {};
        }
        if(!Game.spawns[i].memory.children.created){
            Game.spawns[i].memory.children.created = 0;
        }
        if(!Game.spawns[i].memory.children.alive){
            Game.spawns[i].memory.children.alive = {};
        }
        Game.spawns[i].memory.children.alive.total = 0;
        Game.spawns[i].memory.children.alive.builders = 0;
        Game.spawns[i].memory.children.alive.harvesters = 0;
        Game.spawns[i].memory.children.alive.guards = 0;
        Game.spawns[i].memory.children.alive.medics = 0;
        Game.spawns[i].memory.children.qued.total = 0;
        Game.spawns[i].memory.children.qued.builders = 0;
        Game.spawns[i].memory.children.qued.harvesters = 0;
        Game.spawns[i].memory.children.qued.guards = 0;
        Game.spawns[i].memory.children.qued.medics = 0;
        var que = Game.spawns[i].memory.spawnQue;
        var queLength;
        if(que){
            queLength = Object.keys(que).length;
        }
        var queUrgent = Game.spawns[i].memory.spawnUrgentQue;
        var queUrgentLength;
        if(queUrgent){
            queUrgentLength = Object.keys(queUrgent).length;
        }
        for(var k = 0; k< queLength; k++){
          if(que[k]){
                Game.spawns[i].memory.children.qued.total += 1;
                var creepType = que[k].creepType;
                if(creepType === "builder"){
                    Game.spawns[i].memory.children.qued.builders += 1;
                }
                if(creepType === "guard"){
                    Game.spawns[i].memory.children.qued.guards += 1;
                }
                if(creepType === "harvester"){
                    Game.spawns[i].memory.children.qued.harvesters += 1;
                }
                if(creepType === "medic"){
                    Game.spawns[i].memory.children.qued.medics += 1;
                }
            } 
        }
        for(var k = 0; k< queUrgentLength; k++){
          if(queUrgent[k]){
                Game.spawns[i].memory.children.qued.total += 1;
                var creepType = queUrgent[k].creepType;
                if(creepType === "builder"){
                    Game.spawns[i].memory.children.qued.builders += 1;
                }
                if(creepType === "guard"){
                    Game.spawns[i].memory.children.qued.guards += 1;
                }
                if(creepType === "harvester"){
                    Game.spawns[i].memory.children.qued.harvesters += 1;
                }
                if(creepType === "medic"){
                    Game.spawns[i].memory.children.qued.medics += 1;
                }
            } 
        }     
        for(var creepName in Game.creeps){
            var creep = Game.creeps[creepName];
            var parentSpawn = creep.memory.parentSpawn;
            if(parentSpawn){
                Game.spawns[parentSpawn].memory.children.alive.total += 1;
                if(creep.memory.role === 'builder'){
                    Game.spawns[parentSpawn].memory.children.alive.builders += 1;
                }
                if(creep.memory.role === 'harvester'){
                    Game.spawns[parentSpawn].memory.children.alive.harvesters += 1;
                }
                if(creep.memory.role === 'guard'){
                    Game.spawns[parentSpawn].memory.children.alive.guards += 1;
                }
                if(creep.memory.role === "medic"){
                    Game.spawns[parentSpawn].memory.children.alive.medics += 1;
                }
            }
            
        }
    }
    return "complete";
}
