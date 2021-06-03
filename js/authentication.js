function login() {
    // var { email }
    // const form_data = document.getElementById('login-form');
  
    const form_object = new FormData(document.forms.login_form);
    // console.log(form_object.get("email"));
    // console.log(document.getElementById('login-form').val)
    firebase
      .auth()
      .signInWithEmailAndPassword(
        form_object.get("email"),
        form_object.get("password")
      )
      .then((userCredential) => {
        // Signed in
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
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
          firstName: form_object.get("first_name"),
          lastName: form_object.get("last_name"),
          email: form_object.get("email"),
        };
        const db = firebase.firestore();
        db.collection("users").doc(userId).set(userData);
  
        console.log("We have inserted data of ", user);
  
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  }
  
  function signout() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("Signout Successfully");
        // window.location.href = "../login.html";
        // Sign-out successful.
      })
      .catch(function (error) {
        console.log("Cannot login ", error);
        // An error happened.
      });
  }
  