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

      this.message = message;
      this.results = results;

      return response; 
   }
}

module.exports = Rover;