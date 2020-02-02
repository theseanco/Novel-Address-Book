# Novel Address Book App

[![Netlify Status](https://api.netlify.com/api/v1/badges/dfe91f05-d8ab-49d3-8fc0-2c6047a008f0/deploy-status)](https://app.netlify.com/sites/gallant-feynman-e624fd/deploys)

## About

This app is a simple address book. You can use it to add to a list of addresses. The list of addresses is on a server and will persist between sessions.

For each entry in the list, you need:
- Name
- Notes (optional)
- Address

The address bar will perform a google maps autocomplete lookup based on what you type, you can select an address from the provided list.

Once submitted, the app will convert the addresses to lat/long co-ordinates and store them in a database. The app will then add the new address to the list.

Please go easy on this app! - I only have free API keys and a database hosted on Heroku!

## Using the app

This app can be used [here](https://gallant-feynman-e624fd.netlify.com/). 

The database can be viewed [here](https://novel-address-book-backend.herokuapp.com/addresses).

For a local installation, clone the repo and run `yarn` to install packages, then start a local copy with `yarn start`. Tests can be run with `yarn test`.

To use the Google Maps API key you will need to create your own key and add it to an `.env` variable at the root of the repo following this format: 

```
REACT_APP_GOOGLE_MAPS_API=YOUR_KEY_GOES_HERE
```

There is a guide on how to create a key [here].

As deleting entries was not part of the spec I haven't added it, but it can be done by sending a DELETE request to `https://novel-address-book-backend.herokuapp.com/addresses/:id`. IDs can be found by looking at the database.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## File structure

- The root of the project contains the App and index.js, which are mostly display components
- `src/utilities` contains utlility functions used to interact with the addresses database, as well as google geocoding functionality
- `src/AddressList` contains `AddressList`, which renders out a set of addresses queried from the database using the `src/AddressList/AddressCard` component
- `src/AddressForm` contains the form used to post addresses to the database, as well as a `GeolocationField` component built using `react-places-autocomplete`

## Tech used

### Frontend

- React, with most stateful logic based on Hooks
- create-react-app for OOTB Webpack config
- Sass
- [TypographyJS](https://kyleamathews.github.io/typography.js/) and Moraga theme
- [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/start)
- [react-places-autocomplete](https://github.com/hibiken/react-places-autocomplete)

### Testing

- Jest
- react-testing-library

### Backend

- [json-server-heroku](https://github.com/jesperorb/json-server-heroku) deployment on Heroku

### Deployment

- Netlify hosting and environment variables for API keys
- Netlify Webhooks for automatic deployment on pushes to master

### Organisational

- This project was (hurriedly) ticketed using [Clickup](https://app.clickup.com/) to keep development organised.
- Commits (apart from one i made by mistake) are handled by developing branches against Clickup ticket IDs, and opening Pull Requests against master. The branches are squashed and merged to master, with their commit messages following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification to keep the history readable.
- Where possible I attempted to develop using red-green-refactor TDD principles. Due to the timescale this became quite difficult, particularly for more complex UI elements.
- Components should have unit/UI tests where possible. Some of these components that use external dependencies, particularly `react-places-autocomplete` became quite troublesome because I am not familiar with it.
 
## Possible improvements

- Root app contains state set using a boolean, which is used to inform `useEffect` hooks whether a fetch needs to be performed. While this is fine for an app of this scale, for greater security and less chance for error this could be made into a finite state machine using `useReducer`, but this does take a lot more code, and is probably overkill for a prototype. This problem is also present in the validation form which uses strings to conditionally render error message.
- The app fetches a complete database and cross-references all latitude and longitude co-ordinates on every addition. This has tripped the limiters on the Google Geocoding API more than once. This would probably be solved by using a proper paid-for Google Geocoding API key, _or_:
  - Use a redux instance to load the initial database into, and push changes into there, preventing the need for fetching the entire address book each time using the google API. This would have the drawback of requiring a bunch more code, as well as the database itself no longer being the source of truth for the app: if others were to use it at the same time as you, you wouldn't get their results until refresh. This is overkill for a prototype.
  - Memoize addresses once geolocated to prevent multiple API calls to retrieve the same address each time.
- Add a linter & prettier for code style enforcement
- Deleting records can fairly easily be added using the ID supplied from database calls
- After some testing, it appears that the Heroku server resets to its initial state after a period of inactivity, as Heroku instances spin down after a while and on restart the `db.json` file resets to its original empty state. This could be sorted with a proper database instance, but would require a bit of work.
- CI pipeline preventing code submissions with failing tests
