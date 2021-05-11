# afast

A nodje.js cli to track your time in the Xebia x3/ afas environment. Made as a pet project, to see if I could port an existing 2FA auth flow into the command line, without using an official Afas API or anything.

## Install

Not on npm, so:

```sh
npm install -g github:appelstroop/afast
```

## Usage

To login using 2FA (now only via SMS):

```sh
afast login
```

Then, to track time:

```sh
afast
```

or shorter:

```sh
afast -p [project code] -h [hours]
```
