"use strict";

const moment = require('moment');

const helper = require('./utils/helper');
const meetup = require('./utils/meetup');
const slack = require('./utils/slack');
const reminder = require('./utils/reminder');

const args = helper.getProcessArguments();
if (!args['config']) {
    console.error('Please provide a config file via the "config" argument');
    process.exit(1);
}
const config = require(`./${args['config']}`);

meetup.getUpcomingEvents(config.meetup.apikey, config.meetup.group)
    .then((data) => {
        const requests = data.results
            .map((event) => {
                const activeReminder = reminder.active(config.reminders.daysAhead, moment(event.time));
                return {
                    event,
                    activeReminder
                };
            })
            .filter((event) => event.activeReminder && !event.event.series)
            .map((event) => {
                const message = reminder.createReminder(event);
                return slack.sendReminder(config.slack, message);
            });

        return Promise.all(requests);
    }).catch((error) => {
        console.log(error);
    });
