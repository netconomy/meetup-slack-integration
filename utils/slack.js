"use strict";

const request = require('superagent');

module.exports = {
    sendReminder(config, message) {
        const data = this.createSlackData(config, message);
        return new Promise((resolve, reject) => {
            request.post(config.webhook)
                .send(data)
                .end(function(err, res) {
                    if (err || !res.ok) {
                        reject(new Error('Slack post resulted in status code ' + res.status));
                    } else {
                        resolve();
                    }
                });
        });
    },

    createSlackData(config, message) {
        return {
            channel: config.channel,
            username: config.username,
            icon_url: config.iconUrl,
            text: message
        };
    }
};
