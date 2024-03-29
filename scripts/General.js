// Firebase configuration
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

// Signs out the users
function signOut(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    location.reload();
  }).catch(function(error) {
    // An error happened.
  });
}

// Stores the user's current location and brings them to the login page
function login(){
  console.log(window.location.href)
  let array = window.location.href.split("/");
  let hr = array[array.length - 1];
  if(!array.includes("html")){
    hr = "index.html";
  }
  localStorage.setItem("backURL", hr);
 window.location = "login.html";
}

// Brings to user to their order history
function orderHistor(){
    window.location = "orderHistory.html";

}

// Generates the header on each page
function createHeader() {
  firebase.auth().onAuthStateChanged(function(user) {
    // If the user is signed in
    if (user) {
      let content = "";
      content = `<div class="row">
    <div class="col-5">
        <p id="logo">H⌂useUp</p>
    </div>
    <div class="col-3">
    <button class='btn btn-primary' onClick="orderHistor()">Order History</button>
    </div>
    <div class="col-4">
    <button class='btn btn-danger' onClick="signOut()">Logout</button>
    </div>`;
      let header = document.getElementById("header");
      header.class = "col-12";

      header.innerHTML = content;
    } else {
      // No user is signed in.
    }
  });
  // If the user is not signed in
  let content = "";

  content = `<div class="row">
    <div class="col-auto">
        <p id="logo">H⌂useUp</p>
    </div>
    <div class="col-2">
    <button class='btn btn-success' style='margin-top:7px;margin-right:10px;' onClick="login()">Login</button>
    </div>`;

  let header = document.getElementById("header");
  header.class = "col-12";

  header.innerHTML = content;
}

// Links Firebase configuration and general styling to each page
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

// Gets the available options to populate filter dropdowns
function getSampleList(createElement, table, ID) {
  db.collection(table)
    .get()
    .then(querySnapshot => {
      let addDiv = document.getElementById(ID);
      addDiv.innerHTML += createElement({"Name" : ""});
      querySnapshot.forEach(doc => {
        addDiv.innerHTML += createElement(doc.data());
      });
    });
}
