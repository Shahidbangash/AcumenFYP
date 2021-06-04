function login() {
    const formObject = new FormData(document.forms.login_form);
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
          displayName: form_object.get("first_name"),
        //   lastName: form_object.get("last_name"),
          email: form_object.get("email"),
        };
        // const db = firebase.firestore();
        // db.collection("users").doc(userId).set(userData);
  
        console.log("We have inserted data of ", user);

        document.getElementById(
            "login_response"
          ).innerHTML = `Signup is successful`;
  
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
  