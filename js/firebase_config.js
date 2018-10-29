 var config = {
    apiKey: "AIzaSyDMHBC8K_555_1j5WBi1QJ6Ehv3hu4c9IU",
    authDomain: "kazaliste-6e2e1.firebaseapp.com",
    databaseURL: "https://kazaliste-6e2e1.firebaseio.com",
    projectId: "kazaliste-6e2e1",
    storageBucket: "",
    messagingSenderId: "1025212501760"
  };
  firebase.initializeApp(config);


var oDb = firebase.database();
var oDbGlumci = oDb.ref('glumci');
var oDbPredstave = oDb.ref('predstave');
var oDbPrikazivanja = oDb.ref('prikazivanja');