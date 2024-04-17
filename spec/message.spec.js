const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

//Test 4
test("throws error if a name is NOT passed into the constructor as the first parameter", function () {
    expect( function() { new Message();}).toThrow(new Error('Name required.'));
});

//Test 5
test("constructor sets name", function () {
    let testMessage = new Message("testName");
    expect(testMessage.name).toEqual("testName");
});

//Test 6
test("contains a commands array passed into the constructor as the 2nd argument", function () {
    let commandsArray = [];
    let testMessage = new Message("testName", commandsArray);
    expect(testMessage.commands).toEqual(commandsArray);
});

});
