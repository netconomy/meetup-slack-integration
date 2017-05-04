"use strict";

const moment = require('moment-timezone');

module.exports = {
    active(reminders, event) {
        const today = moment().startOf('day').second(1);
        const difference = moment.duration(event - today);
        const daysTillEvent = Math.floor(difference.asDays());

        const activeReminders = reminders.filter((reminder) => {
            return daysTillEvent === reminder;
        });

        // If there are more than one activeReminders this is reduced to one, as only 1 message should be posted
        return activeReminders.length > 0 ? activeReminders[0] : null;
    },

    createReminder(data) {
        const duration = moment.duration(data.activeReminder, 'd');
        const date = moment.tz(data.event.time, 'UTC');
        date.add(data.event.utc_offset, 'milliseconds');

        return `<!channel> Reminder:\n` +
            `"${data.event.name}" is taking place in ${duration.humanize()}\n` +
            `Don't forget to RSVP: ${data.event.event_url}\n` +
            `${date.format("HH:mm on dddd, MMMM Do YYYY")}`;
    }
};
