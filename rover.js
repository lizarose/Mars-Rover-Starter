class Rover {
  // Write code here!
  constructor(position) {
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }
  receiveMessage(message) {
    let results = [];
    let roverResp = { message: message.name, results };

    for (let i = 0; i < message.commands.length; i++) {
      let command = message.commands[i];

      if (command.commandType === "MODE_CHANGE") {
        this.mode = command.value;
        results.push({ completed: true });
      } else if (command.commandType === "MOVE") {
        if (this.mode === "LOW_POWER") {
          console.log("Can't be moved in this state.");
          results.push({ completed: false });
        } else {
        this.position = Number(command.value);
        results.push({ completed: true });
        }
      } else if (command.commandType === "STATUS_CHECK") {
        results.push({
          completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position,
          },
        });
      }
    }
    return roverResp;
  }
}
module.exports = Rover;
