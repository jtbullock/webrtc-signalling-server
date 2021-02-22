const assert = require('assert');
const answerOfferHandler = require('../../src/message-handlers/answer-offer');
const
    = require('jasmine');

describe('Message Handler: Answer Offer', () => {

    const sendToSpy = jasmine.createSpy('sendTo');

    const fakeSocketData = {
        helpers: {
            getUser: () => ({}),
            notifyCallerIfUnknownUser: () => false,
            sendTo: sendToSpy
        }
    };

    const fakeMessage = {
        name: 'OtherUser'
    };

    it('should send an answer to the requested user', () => {
        assert(sendToSpy.called.once());
    });
});
