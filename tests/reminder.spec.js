"use strict";

const moment = require('moment');
const chai = require('chai');
const expect = chai.expect;

const reminder = require('../utils/reminder');

describe('active', () => {
    it('should return null if no reminders are provided', () => {
        const event = moment();

        expect(reminder.active([], event)).to.be.equal(null);
    });

    it('should return the reminder for events within range of reminder', () => {
        const event = moment().add(2, 'd');

        expect(reminder.active([2], event)).to.be.equal(2);
    });

    it('should return the reminder for events within range of reminder at 00:01', () => {
        const event = moment().add(2, 'd').startOf('day').minute('1');

        expect(reminder.active([2], event)).to.be.equal(2);
    });

    it('should return the reminder for events within range of reminder at 24:00', () => {
        const event = moment().add(3, 'd').startOf('day');

        expect(reminder.active([2], event)).to.be.equal(2);
    });

    it('should return null for events outside range of reminder', () => {
        const event1 = moment().add(2, 'd').startOf('day');
        const event2 = moment().add(3, 'd').startOf('day').minute('1');

        expect(reminder.active([2], event1)).to.be.equal(null);
        expect(reminder.active([2], event2)).to.be.equal(null);
    });

    it('should return the specific active reminder for events if multiple provided', () => {
        const event1 = moment().add(2, 'd');
        const event2 = moment().add(4, 'd');
        const event3 = moment().add(6, 'd');

        expect(reminder.active([2, 4, 6], event1)).to.equal(2);
        expect(reminder.active([2, 4, 6], event2)).to.equal(4);
        expect(reminder.active([2, 4, 6], event3)).to.equal(6);
    });

    it('should return null for events between two reminders', () => {
        const event = moment().add(3, 'd');

        expect(reminder.active([2, 4], event)).to.be.equal(null);
    });
});
