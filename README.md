# HypertabsEX
HypertabsEX is a decompilation of [https://titaniumnetwork.org/](https://titaniumnetwork.org) with the backend of [Corrosion](https://github.com/titaniumnetwork-dev/Corrosion).

## Run
`npm i` to initialize the repository. To then run HypertabsEX, use the command `node serve/index.js` and visit localhost. Further Corrosion configuration information is available [here](https://github.com/titaniumnetwork-dev/Corrosion).

## Bugs
 - the URL displays with two slashes in a row (`//`) in the URL bar unless there are directories in the url path.
 - the title of the tab is simply the URL (a placeholder, because I couldn't figure out how to get it to the actual iframe title.)
 - none of the settings work. Not sure why, actually.