# Meetup.com Slack Integration
Simple Slack integration which posts meetup reminders in a certain channel.

It gathers the upcoming meetups from your meetup.com group and posts a reminder message into your teams Slack channel.
The reminder can be configured how many days before the start of the meetup the message should be posted.

Currently the posted message is fixed and english only.

## Setup

Run `npm install` in the apps root directory.
Create your own config.json. An example file is included in the project (`config.example.json`).

The config options are the following:
```JavaScript
{
  "reminders": {
    "daysAhead": [1, 4] // days till the event starts. Supports multiple reminders (e.g. 1 day ahead and 4 days ahead).
  },
  "meetup": {
    "group": "", // the name of your group (as displayed in the URL)
    "apikey": "" // the api key needs to be retrieved from https://secure.meetup.com/meetup_api/key/
  },
  "slack": {
    "webhook": "", // copy the url from your webhook created in Slack
    "channel": "", // the channel or user to post the message to (#channel or @username)
    "username": "", // the username the bot should use (leave empty for configured default)
    "icon_url": "" // the icon the bot should use (leave empty for configured default)
  }
}
```

## Run
You can run the reminder with `npm run start -- -config=config.json`. The parameter -config should point to your
provided config file.

The messages will be posted to Slack immediatly, if reminders apply.
The integration is designed to run as a cronjob once per day, at the desired time the messages should be posted.
