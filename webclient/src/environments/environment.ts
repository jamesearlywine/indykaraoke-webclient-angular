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
  },
  markers: {
    styling: {
      fillColor: '#075249',
      fillOpacity: 1,
      path: 'M 0,0 C -5,-25 -10,-19 -10,-30 A 10,10 0 1,1 10,-30 C 10,-19 5,-25 0,0 z',
      strokeColor: '#09DAC0',
      strokeWeight: .75,
      scale: 1,
      labelOriginX: -1,
      labelOriginY: -29
    },
    labelStyling: {
      color: 'white',
      fontFamily: 'Arial',
      fontSize: '13px',
      fontWeight: '550',
    }
  }

};
