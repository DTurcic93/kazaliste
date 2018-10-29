var config = {
    apiKey: "AIzaSyAg7O5ET6EtXGp8hOcKcMV3rNphGSCsMg0",
    authDomain: "ansambl-6fe56.firebaseapp.com",
    databaseURL: "https://ansambl-6fe56.firebaseio.com",
    projectId: "ansambl-6fe56",
    storageBucket: "ansambl-6fe56.appspot.com",
    messagingSenderId: "961055330354"
  };
  firebase.initializeApp(config);


var oDb = firebase.database();
var oDbGlumci = oDb.ref('glumci');
var oDbPredstave = oDb.ref('predstave');
var oDbPrikazivanja = oDb.ref('prikazivanja');