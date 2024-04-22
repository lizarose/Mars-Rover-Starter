const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

//Test 7
test("constructor sets position and default values for mode and generatorWatts", function () {
  let testRover = new Rover("testPosition");
  let mode = "NORMAL";
  let generatorWatts = 110;  

  expect(testRover.position).toEqual("testPosition");
  expect(testRover.mode).toEqual(mode);
  expect(testRover.generatorWatts).toEqual(generatorWatts);

});

//Test 8
test("response returned by receiveMessage contains the name of the message", function () {
  let commands = [
    {commandType: "STATUS_CHECK"},
    {commandType: 'MODE_CHANGE', value: 'LOW_POWER'},
    {commandType: 'MOVE', value: 'position'}
  ];
  let message = new Message("testMessage", commands);
  let rover = new Rover(1);
  let response = rover.receiveMessage(message)
 

  expect(response.response).toEqual("testMessage");
});

//Test 9
test("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
  let commands = [
    {commandType: "STATUS_CHECK"},
    {commandType: 'MODE_CHANGE', value: 'LOW_POWER'},
    // {commandType: 'MOVE', value: 'position'}
  ];
  let message = new Message("testMessage", commands);
  let rover = new Rover(1);
  let response = rover.receiveMessage(message);
  
  expect(response.results.length).toBe(2);
});

//Test 10
test("responds correctly to the status check command", function () {
  let commands = [
    {commandType: "STATUS_CHECK"},
    {commandType: 'MODE_CHANGE', value: 'LOW_POWER'},
  ];
  let message = new Message("testMessage", commands);
  let rover = new Rover(1);
  let response = rover.receiveMessage(message);

  expect(response.results[0].completed).toBe(true);
  expect(response.results[0].roverStatus['mode']).toBe('NORMAL');
  expect(response.results[0].roverStatus['generatorWatts']).toBe(110);
  expect(response.results[0].roverStatus['position']).toBe(1);
});
//Test 11
test("responds correctly to the mode change command", function () {
  let commands = [
    {commandType: 'MODE_CHANGE', value: 'LOW_POWER'},
    {commandType: "STATUS_CHECK"},
  ];
  let message = new Message("testMessage", commands);
  let rover = new Rover(1);
  let response = rover.receiveMessage(message);

  expect(response.results[1].completed).toBe(true);
  expect(response.results[1].roverStatus['mode']).toBe('LOW_POWER');
});
//Test 12
test("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
  let commands = [
    {commandType: 'MODE_CHANGE', value: 'LOW_POWER'},
    {commandType: "STATUS_CHECK"},
  ];
  let message = new Message("testMessage", commands);
  let rover = new Rover(1);
  let response = rover.receiveMessage(message);
  message = ("testMessage", 'LOW_POWER');

  expect(response.results[2].completed).toBe(false);
  expect(response.results[1].roverStatus['mode']).toBe('LOW_POWER');
});
//Test 13
test("responds with the position for the move command", function () {
  let commands = [
    {commandType: 'MOVE', value: '1234'},
    //{commandType: 'MODE_CHANGE', value: 'LOW_POWER'},
    {commandType: "STATUS_CHECK"},
  ];
  let message = new Message("testMessage", commands);
  let rover = new Rover(1);
  let response = rover.receiveMessage(message);
  

  expect(response.results[0].completed).toBe(true);
  expect(response.results[1].roverStatus['position']).toBe(1234);
});

});
