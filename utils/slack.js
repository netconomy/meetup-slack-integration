"use strict";

const request = require('superagent');

module.exports = {
    sendReminder(slackConfig, message) {
        const data = Object.assign({}, slackConfig, {
            text: message,
            webhook: null
        });
        return new Promise((resolve, reject) => {
            request.post(slackConfig.webhook)
                .send(data)
                .end(function(err, res) {
                    if (err || !res.ok) {
                        reject(new Error('Slack post resulted in status code ' + res.status));
                    } else {
                        resolve();
                    }
                });
        });
    }
};
