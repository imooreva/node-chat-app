var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message.js');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'SomeUser';
        let text = 'Some message';
        let message = generateMessage(from, text);
        expect(message).toInclude({from, text});
        expect(message.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
   it('should generate correct location object', () => {
       let from = 'Jason';
       let latitude = 15;
       let longitude = 19;
       let url = 'https://www.google.com/maps?q=15,19';
       let message = generateLocationMessage(from, latitude, longitude);
       expect(message).toInclude({from, url});
       expect(message.createdAt).toBeA('number');
   });    
});