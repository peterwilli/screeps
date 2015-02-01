var memoryManager = require('memoryManager');
var creepManager = require('creepManager');
var spawnManager = require('spawnManager');
// Memory Management
memoryManager.clearDeadCreeps();
memoryManager.updateSpawnInfo();
memoryManager.guardCount();
// Creep Management
creepManager.roleActions();

// Spawn Management
//spawnManager.queSpawn("Spawn1","guard",1);
//spawnManager.queSpawn("Spawn1","builder",1);
//spawnManager.queSpawn("Spawn1","harvester",1);
spawnManager.evaluate("Spawn1", "init");