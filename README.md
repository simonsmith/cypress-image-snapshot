# Cypress Image Snapshot

Cypress Image Snapshot binds [jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot)'s image diffing logic to [Cypress.io](https://cypress.io) commands.

[![build-and-test](https://github.com/simonsmith/cypress-image-snapshot2/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/simonsmith/cypress-image-snapshot2/actions/workflows/build-and-test.yml)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
  - [In your tests](#in-your-tests)
    - [Options](#options)
  - [Updating snapshots](#updating-snapshots)
  - [Preventing failures](#preventing-failures)
  - [Requiring snapshots to be present](#requiring-snapshots-to-be-present)
- [How it works](#how-it-works)
- [Requirements](#requirements)
- [TypeScript](#typescript)
- [What about the original `jaredpalmer/cypress-image-snapshot`?](#what-about-the-original-jaredpalmercypress-image-snapshot)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

Install with your chosen package manager

```bash
# yarn
yarn add --dev @simonsmith/cypress-image-snapshot

# npm
npm install --save-dev @simonsmith/cypress-image-snapshot
```

Next, import the plugin function and add it to the [`setupNodeEvents` function](https://docs.cypress.io/guides/references/configuration#setupNodeEvents):

```ts
// cypress.config.ts

import {defineConfig} from 'cypress'
import {addMatchImageSnapshotPlugin} from '@simonsmith/cypress-image-snapshot/plugin'

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      addMatchImageSnapshotPlugin(on)
    },
  },
})
```

And finally, add the command to your relevant [support file](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Support-file):

```ts
// cypress/support/e2e.ts

import {addMatchImageSnapshotCommand} from '@simonsmith/cypress-image-snapshot/command'

addMatchImageSnapshotCommand()

// can also add any default options to be used 
// by all instances of `toMatchSnapshot`
addMatchImageSnapshotCommand({
  failureThreshold: 0.2
})
```

## Usage

### In your tests

```ts
describe('Login', () => {
  it('should be publicly accessible', () => {
    cy.visit('/login');

    // snapshot name will be the test title
    cy.matchImageSnapshot();

    // snapshot name will be the name passed in
    cy.matchImageSnapshot('login');

    // options object passed in
    cy.matchImageSnapshot({
      failureThreshold: 0.4
      blur: 10
    });

    // match element snapshot
    cy.get('#login').matchImageSnapshot();
  });
});
```

#### Options

The options object combines jest-image-snapshot and Cypress screenshot configuration.

* [jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot#%EF%B8%8F-api)
* [Cypress screenshot](https://docs.cypress.io/api/commands/screenshot#Arguments)

```ts
cy.matchImageSnapshot({
  // options for jest-image-snapshot
  failureThreshold: 0.2,
  comparisonMethod: 'ssim',

  // options for Cypress.screenshot()
  capture: 'viewport',
  blackout: ['.some-element'],
})
```

### Updating snapshots

Run Cypress with `--env updateSnapshots=true` in order to update the base image files for all of your tests.

### Preventing failures

Run Cypress with `--env failOnSnapshotDiff=false` in order to prevent test failures when an image diff does not pass.

### Requiring snapshots to be present

Run Cypress with `--env requireSnapshots=true` in order to fail if snapshots are missing. This is useful in continuous integration where snapshots should be present in advance.

## How it works

The workflow of `cy.matchImageSnapshot()` when running Cypress is:

1.  Take a screenshot with `cy.screenshot()` named according to the current test.
2.  Check if a saved snapshot exists in `<rootDir>/cypress/snapshots` and if so diff against that snapshot.
3.  If there is a resulting diff, save it to `<rootDir>/cypress/snapshots/__diff_output__`.

## Requirements

Tested on Cypress > 10.0.0
Cypress must be installed as a peer dependency

## TypeScript

This plugin fully supports TypeScript so you can safely remove any reference to `@types/cypress-image-snapshot` from your project

## What about the original `jaredpalmer/cypress-image-snapshot`?

This is a rewrite of that plugin as it has been abandoned. Originally [I did attempt](https://github.com/jaredpalmer/cypress-image-snapshot/issues/252#issuecomment-1156834734) to bring the original up to date and instead released a forked version as a stop gap. Since then this has become an active plugin so the decision was made to make it more than just a temporary fork.

Full credit goes to [Jared Palmer](https://github.com/jaredpalmer) for his excellent work.
