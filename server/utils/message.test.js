var expect = require('expect');
var {generateMessage} = require('./message.js');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'SomeUser';
        let text = 'Some message';
        let message = generateMessage(from, text);
        expect(message).toInclude({from, text});
        expect(message.createdAt).toBeA('number');
    });
});