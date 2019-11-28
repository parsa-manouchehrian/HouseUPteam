var firebaseConfig = {
  apiKey: "AIzaSyCo0nUgjDTbPTZGp1YIbjP2mKRQ3pNtQao",
  authDomain: "houseup-b34e1.firebaseapp.com",
  databaseURL: "https://houseup-b34e1.firebaseio.com",
  projectId: "houseup-b34e1",
  storageBucket: "houseup-b34e1.appspot.com",
  messagingSenderId: "980464254442",
  appId: "1:980464254442:web:d2f128dca2d663c8288693",
  measurementId: "G-Z4RG137FW0"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

function signOut(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    location.reload();
  }).catch(function(error) {
    // An error happened.
  });
}

function login(){
  let array = window.location.href.split("/");
  localStorage.setItem("backURL", array[array.length - 1]);
  window.location = "login.html";
}

function createHeader() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      let content = "";
      content = `<div class="row">
    <div class="col-10">
        <p id="logo">H⌂useUp</p>
    </div>
    <div class="col-2">
    <i id="menu" class="fa fa-sign-out" onClick='signOut()'></i>

    </div>`;
      let header = document.getElementById("header");
      header.class = "col-12";

      header.innerHTML = content;
    } else {
      // No user is signed in.
    }
  });
  let content = "";

  content = `<div class="row">
    <div class="col-10">
        <p id="logo">H⌂useUp</p>
    </div>
    <div class="col-2">
      <i id="menu" class="fa fa-user" onClick="login()"></i>
    </div>`;

  let header = document.getElementById("header");
  header.class = "col-12";

  header.innerHTML = content;
}

function createFireBaseConfiguration() {
  let content = `
  <link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"
/>

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<link rel="stylesheet" href="style/GeneralStyle.css" />

    `;

  document.head.innerHTML += content;
}

createFireBaseConfiguration();
createHeader();

function getSampleList(createElement, table, ID) {
  db.collection(table)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let addDiv = document.getElementById(ID);

        addDiv.innerHTML += createElement(doc.data());
      });
    });
}
