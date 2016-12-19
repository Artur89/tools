# Tooling

## Requiements
Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed

## Setup
Run ```npm install``` to install dependencies

## Usage

### links
In `/data/links.json` you'll find following structure:
```
[
	{
		"url": "urls-to-make-requests",
		"test": "case sensetive String to find in response"
	},
	...
]
```
Run ```npm run links``` to execute

### escape
Replaces String from clipboard with RegExp escaped characters.

Run ```npm run escape``` to execute
