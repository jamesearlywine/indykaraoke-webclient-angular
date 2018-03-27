export const environment = {
  production: true,
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
