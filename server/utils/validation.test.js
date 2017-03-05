const expect = require('expect');
const {isRealString} = require('./validation.js');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        let roomName = isRealString(1234);
        expect(roomName).toBe(false);        
    });
    it('should reject string with only spaces', () => {
        let roomName = isRealString('    ');
        expect(roomName).toBe(false);
    });
    it('should allow string with non-space characters', () => {
        let roomName = isRealString('#lounge');
        expect(roomName).toBe(true);
    });
});