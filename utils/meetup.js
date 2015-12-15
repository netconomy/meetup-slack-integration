"use strict";

const request = require('superagent');

module.exports = {
    getUpcomingEvents(apikey, group) {
        const url = `https://api.meetup.com/2/events?key=${apikey}&group_urlname=${group}&sign=true&fields=series`;
        return new Promise((resolve, reject) => {
            request.get(url)
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if (err || !res.ok) {
                        reject(new Error('Meetup group request resulted in status code ' + res.status));
                    } else {
                        return resolve(res.body);
                    }
                });
        });
    },

    getEventDetails(apikey, event) {
        const url = `https://api.meetup.com/${event.group.urlname}/events/${event.id}` +
            `?key=${apikey}&sign=true&fields=series`;
        return new Promise((resolve, reject) => {
            request.get(url)
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if (err || !res.ok) {
                        reject(new Error('Meetup event request resulted in status code ' + res.status));
                    } else {
                        console.log(res.body);
                        return resolve(res.body);
                    }
                });
        });
    }
};
