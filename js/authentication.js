function login() {
  const formObject = new FormData(document.forms.login_form);

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      firebase
        .auth()
        .signInWithEmailAndPassword(
          formObject.get("email"),
          formObject.get("password")
        )
        .then((userCredential) => {
          // Signed in
          // ...
          document.getElementById(
            "login_response"
          ).innerHTML = `Login is successful`;

          location.href = "./index.html";

        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
          document.getElementById(
            "login_response"
          ).innerHTML = `${errorCode}  ${errorMessage}`;
        });
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      document.getElementById(
        "login_response"
      ).innerHTML = `${errorCode}  ${errorMessage}`;
    });



}

function signup() {
  const form_data = new FormData(document.forms.signup_form);

  firebase
    .auth()
    .createUserWithEmailAndPassword(
      form_data.get("email"),
      form_data.get("password")
    )
    .then((userCredential) => {
      // console.log(user);
      const userId = userCredential.user.uid;
      const user = {
        displayName: form_data.get("first_name"),
        //   lastName: form_object.get("last_name"),
        email: form_data.get("email"),
        uid: userId,
      };
      const db = firebase.firestore();
      db.collection("users").doc(userId).set(user).then(() => {
        console.log("We have inserted data of ", user);

        document.getElementsByClassName(
          "response-message"
        )[0].innerHTML = `Signup is successful`;
        // Redirect User to Home Page
        location.href = "index.html";

      }).catch((error) => {

        document.getElementsByClassName(
          "response-message"
        )[0].innerHTML = `${error.errorMessage}`;

      });
      // firebase.auth().currentUser


      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      document.getElementsByClassName(
        "response-message"
      )[0].innerHTML = errorMessage;
      // ..
    });
}

function signout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("Signout Successfully");
      window.location.href = "../login.html";
      // Sign-out successful.
    })
    .catch(function (error) {
      console.log("Cannot login ", error);
      // An error happened.
    });
}

function showOutput() {

  let form = document.getElementsByClassName("custom-form")[0];
  let form_data = new FormData(form);
  console.log(form_data.get("no-of-days"));

  var product_names = document.getElementsByClassName("product-name");
  //   var trial_days = document.getElementsByClassName("trial-days");

  for (var i = 0; i < product_names.length; i++) {
    product_names[i].innerHTML = form_data.get("product-name");
  }
  document.getElementById("form-output").style.display = "block";
}

function switchForm(show_form, hide_form) {
  document.getElementById("login_form").reset();
  document.getElementById("signup_form").reset();
  document.getElementById(hide_form).classList.add("d-none");
  document.getElementById(show_form).classList.remove("d-none");
}


function getCollection() {
  const user = firebase.auth().currentUser;

  if (user) {
    db.collection("history").doc(user.doc)
      .withConverter(cityConverter)
      .get().then((doc) => {
        if (doc.exists) {
          // Convert to City object
          var city = doc.data();
          // Use a City instance method
          console.log(city.toString());
        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });

  } else {
    // No user is signed in.
    console.log("User is not Sign in ");

  }


}


function resetPassword() {
  // const user = firebase.auth().currentUser;
  const form_data = new FormData(document.forms.reset_form);


  firebase.auth().sendPasswordResetEmail(form_data.get("email"),).then(() => {
    // Update successful
    // reset_email_response
    document.getElementsByClassName(
      "reset_email_response"
    )[0].innerHTML = `We have sent Email sent`;
    document.getElementById("reset_form").reset();
    // ...
  }).catch((error) => {
    // An error occurred
    // ...
    var errorCode = error.code;
    var errorMessage = error.message;
    document.getElementsByClassName(
      "reset_email_response"
    )[0].innerHTML = `${errorCode}  ${errorMessage}`;
  });
}
