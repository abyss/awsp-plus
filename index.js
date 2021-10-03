#!/usr/bin/env node

const fs = require("fs");
const inquirer = require("inquirer");
inquirer.registerPrompt('search-list', require('inquirer-search-list'));

console.log("AWS Profile Switcher Plus");

const homeDir = process.env["HOME"];
const profileRegex = /\[profile .*]/g;
const bracketsRemovalRegx = /(\[profile )|(\])/g;
const defaultProfileChoice = "default";

const promptProfileChoice = (data) => {
  const matches = data.match(profileRegex);

  if (!matches) {
    console.log("No profiles found.");
    console.log(
      "Refer to this guide for help on setting up a new AWS profile:"
    );
    console.log(
      "https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html"
    );

    return;
  }

  const profiles = matches.map((match) => {
    return match.replace(bracketsRemovalRegx, "");
  });

  profiles.push(defaultProfileChoice);

  const profileChoice = [
    {
      type: "search-list",
      name: "profile",
      message: "Choose a profile",
      choices: profiles,
      default: process.env.AWS_PROFILE || defaultProfileChoice,
    },
  ];

  return inquirer.prompt(profileChoice);
};

const readAwsProfiles = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${homeDir}/.aws/config`, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const writeToConfig = (answers) => {
  const profileChoice =
    answers.profile === defaultProfileChoice ? "" : answers.profile;

  return new Promise((resolve, reject) => {
    fs.writeFile(`${homeDir}/.awsp`, profileChoice, { flag: "w" }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

readAwsProfiles()
  .then(promptProfileChoice)
  .then(writeToConfig)
  .catch((error) => {
    console.log("Error:", error);
    process.exit(1);
  });
