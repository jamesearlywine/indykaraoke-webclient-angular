// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  city: 'indianapolis',
  webserviceEndpoints: {
    venues: 'http://webservice.indykaraoke.com/api/v1/venues',
    weeklyEvents: 'http://webservice.indykaraoke.com/api/v1/weeklyEvents'
  }
};
