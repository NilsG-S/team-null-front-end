# Contributing
To get involved with this project, you'll need to do a few things.

## Before You Start

There are a few tools and design patterns that every front end developer for this project must familiarize themselves with:

- Redux and react-redux - Components that need to be aware of user permissions have to read it from the Redux store. To do so, you must use the `connect` function from react-redux.
- Grommet - Grommet is the UX library used in this project. Developers should be familiar the components it provides.
- react-router - This project uses react-router to manage UI with respect to the URL.
- React

This resource has links to information on everything listed here: https://github.com/TTUSDC/CPCEEDWebApp/wiki/Resources.

## Making Changes

1. Download [Node.js](https://nodejs.org/) and [Git](https://git-scm.com/). **NPM 3.0 or above is required to build grommet**. Node.js 5.0.0 or above comes packaged with an acceptable version of NPM. People with versions of Node.js below 5.0.0 should upgrade to the latest stable version. Node.js 6.5.0 or above is preferred for developers working on the project. Anything below that cannot be guaranteed to function properly.
2. Clone this repository by running `git clone https://github.com/NilsG-S/team-null-front-end.git` in the location of your choice.
3. Download the dependencies by running `npm install` when you're in the project directory.

### Testing Your Changes

Once you've started making changes, you'll need to make sure the app still runs properly.
To use the testing server, do the following:

1. Run `npm start` from the project directory.
2. Enter `localhost:8080` into the URL bar of your browser to see the app.

You should also run the unit tests to ensure the code is still functioning properly.
To run the unit tests, do the following:

1. Make sure you have Firefox installed. This project has the Karma test runner set up to use Firefox.
2. Run `npm test` from the project directory.

As you're writing application code, you should also be writing unit tests that can be used to ensure your code doesn't get broken.
Unit tests go in `test`, which follows the same structure as `src`.
You should put your tests in the `test` subdirectory that mirrors the `src` subdirectory where you wrote your application code.
You must make sure your tests are either included by `test/index.js` directly or included by an `index.js` file that is linked to `test/index.js` through other `include` statements.
The testing libraries used in this project are as follows:

1. Mocha: a test framework.
2. Chai: for making assertions about tests.
3. Sinon: for spying on, stubbing, or mocking functions.
4. Enzyme: a library that allows React components to be tested effectively (primarily through shallow rendering).

## Coding Standards
We use [Airbnb's](https://github.com/airbnb/javascript) JavaScript style guide

Notable Aspects:

- Indents should be 2 spaces.
- Regular files and folders should use `dash-separated-names`. Short folder names are preferred.
- React components should use `UpperCamelCase` for the class name, the file name, and the parent folder name.
