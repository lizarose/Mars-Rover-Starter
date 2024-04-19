class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   }
   receiveMessage(message) {
      let results = [];
      let response = message.name;
      let roverResp = {response, results};

      for (let type of message.commands) {
           
         if (type.commandType === "MOVE") {
            this.position = type.value;
            results.push({completed: true});
            
         } else if (type.commandType === "STATUS_CHECK") {
            results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}});
            
         } else if (type.commandType === "MODE_CHANGE") {
            if (this.mode === "LOW_POWER") {
               console.log(`Can't be moved in this state.`);
               results.push({completed: false});
            } else {
               this.mode = type.value;
               results.push({completed: true});
               }
            }
         }
         console.log(roverResp.results)
      return roverResp;
    }
}
module.exports = Rover;