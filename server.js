"use strict";

const moment = require('moment');
const fs = require('fs');
const argv = require('yargs').option({
    config: {
        type: 'string',
        demand: true,
        description: 'Path to a configuration file'
    }
}).argv;

const meetup = require('./utils/meetup');
const slack = require('./utils/slack');
const reminder = require('./utils/reminder');

const config = JSON.parse(fs.readFileSync(argv.config));

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
    }, (error) => {
        console.log(error);
        process.exit(1);
    });
