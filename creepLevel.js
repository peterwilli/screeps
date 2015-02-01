/* creepLevel.js
* creepLevel.getParts(creepType)
*
*
*/
var harvesterParts = {
	"1": [Game.TOUGH, Game.WORK, Game.WORK,   Game.CARRY,   Game.MOVE], // 1xWORK 1xCARRY 1xMOVE
	"2": [Game.WORK,  Game.WORK, Game.WORK,   Game.CARRY,   Game.MOVE]
}
var guardParts = {
	"1": [Game.TOUGH, Game.MOVE, Game.RANGED_ATTACK,   Game.ATTACK,  Game.ATTACK],
	"2": [Game.MOVE,  Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.ATTACK,  Game.ATTACK]
}
var builderParts = {
	"1": [Game.TOUGH, Game.WORK,  Game.WORK,  Game.MOVE,    Game.MOVE],
	"2": [Game.WORK,  Game.WORK,  Game.WORK,  Game.MOVE,    Game.MOVE]
}
var medicParts = {
	"1":[Game.TOUGH,  Game.MOVE,  Game.MOVE,  Game.HEAL],
	"2":[Game.TOUGH,  Game.MOVE,  Game.MOVE,  Game.HEAL,    Game.HEAL]
}

exports.getParts = function(creepType,level){
	if(creepType === "guard"){
		return guardParts[level];
	}
	if(creepType === "harvester"){
		return harvesterParts[level];
	}
	if(creepType === "builder"){
		return builderParts[level];
	}
	if(creepType === "medic"){
		return medicParts[level];
	}
}