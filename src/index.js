/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');
var names = require('./names');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
	'de-DE': {
		translation: {
			SKILL_NAME: 'Baby Namen',
			WELCOME_MESSAGE: 'Willkommen bei "Baby Namen". Du kannst beispielsweise sagen: Nenne mir einen Vornamen. Ich kenne über 5000, also los geht\'s.',
            WELCOME_REPROMT: 'Wenn du wissen möchtest, was du sagen kannst, sag einfach „Hilf mir“.',
            HELP_MESSAGE: 'Ich kenne über 5000 beliebte Vornamen. Du kannst sagen, „Nenne mir einen Vornamen“, und ich verrate dir einen. Oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        const speechOutput = this.t('WELCOME_MESSAGE');
        const reprompt = this.t('WELCOME_REPROMT');
        this.emit(':ask', speechOutput, reprompt);
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        const nameIndex = Math.floor(Math.random() * names.length);
        const randomName = names[nameIndex].name;

        // Create speech output
        const speechOutput = randomName;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomName);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.NextIntent': function () {
        this.emit('GetFact');
    },
    'AMAZON.PreviousIntent': function () {
        this.emit('GetFact');
    },
    'AMAZON.NoIntent': function () {
        this.emit('GetFact');
    },
    'AMAZON.YesIntent': function () {
        this.emit('GetFact');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
