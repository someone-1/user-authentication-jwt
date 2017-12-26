const passport = require('passport');

const googleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('./keys');

passport.use(
    new googleStrategy({
        // options for google strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
    }, (accessToken , refreshToken , profileInfo , done) => {

        console.log('profile info '  , profileInfo)
        // this gives the profile info
        console.log('passport callback function fired')
        // passport callback function
    })
)

var sampleData = 
{
    id: '118214742212744950176',
    displayName: 'Nagesh Bs',
    name: 
    {
        familyName: 'Bs',
        givenName: 'Nagesh'
    },
    photos: [
        {
            value: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50'
        }
    ],
    gender: undefined,
    provider: 'google',
    _raw: '{\n "kind": "plus#person",\n "etag": "\\"ucaTEV-ZanNH5M3SCxYRM0QRw2Y/hV_DZb2TxIyo-E8Oq-SeuRupkSs\\"",\n "objectType": "person",\n "id": "118214742212744950176",\n "displayName": "Nagesh Bs",\n "name": {\n  "familyName": "Bs",\n  "givenName": "Nagesh"\n },\n "url": "https://plus.google.com/118214742212744950176",\n "image": {\n  "url": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",\n  "isDefault": true\n },\n "organizations": [\n  {\n   "name": "st josephsindianhighschool",\n   "type": "school",\n   "primary": false\n  }\n ],\n "placesLived": [\n {\n   "value": "india",\n   "primary": true\n  }\n ],\n "isPlusUser": true,\n "language": "en_GB",\n "circledByCount": 0,\n "verified": false\n}\n',
    _json:
    {
        kind: 'plus#person',
        etag: '"ucaTEV-ZanNH5M3SCxYRM0QRw2Y/hV_DZb2TxIyo-E8Oq-SeuRupkSs"',
        objectType: 'person',
        id: '118214742212744950176',
        displayName: 'Nagesh Bs',
        name:
        {
            familyName: 'Bs',
            givenName: 'Nagesh' 
        },
        url: 'https://plus.google.com/118214742212744950176',
        image:
        {
            url: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50',
            isDefault: true
        },
            organizations: [ [Object] ],
            placesLived: [ [Object] ],
            isPlusUser: true,
            language: 'en_GB',
            circledByCount: 0,
            verified: false 
        }
    }