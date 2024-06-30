"use strict";

var logInBtn = document.querySelector(".login");
var nameInput = document.querySelector("#name");
var emailInput = document.querySelector("#email");
var passwordInput = document.querySelector("#password");
var alert = document.querySelector(".alert");

var userContainer = [];
if (localStorage.getItem("user") != null) {
  userContainer = JSON.parse(localStorage.getItem("user"));
}


function login() {
  validateForm();
  if (isValid) {
    searchIsEmailExist();
    if (isExist) {
      alert.classList.replace("d-inline-block", "d-none");
      searchIsPasswordCorrect();
      if (isCorrectPassword) {
        console.log("correct");
        location.href = "logout.html";
      } else {
        alert.classList.replace("d-none", "d-inline-block");
        alert.innerHTML = "incorrect email or password";
      }
    } else {
      alert.classList.replace("d-none", "d-inline-block");
      alert.innerHTML = "incorrect email or password";
    }
  }
}

var isValid;
function validateForm() {
  switch (true) {
    case emailInput.value == "" || emailInput.value == null:
    case passwordInput.value == "" || passwordInput.value == null:
      alert.classList.replace("d-none", "d-inline-block");
      alert.innerHTML = "All inputs is required";
      isValid = false;
      break;
    default:
      alert.classList.replace("d-inline-block", "d-none");
      isValid = true;
      break;
  }
}

var isCorrectPassword;
function searchIsPasswordCorrect() {
  for (var i = 0; i < userContainer.length; i++) {
    if (userContainer[i].password == passwordInput.value) {
      sessionStorage.setItem('userName',JSON.stringify(userContainer[i].name))
      isCorrectPassword = true;
      break;
    } else {
      isCorrectPassword = false;
    }
  }
}

// sign up functions

function signUp() {
  var regex = /^([a-z]|[A-Z]){5,20}@gmail\.com$/;
  switch (true) {
    case nameInput.value == "" || nameInput.value == null:
    case emailInput.value == "" || emailInput.value == null:
    case passwordInput.value == "" || passwordInput.value == null:
      alert.classList.replace("d-none", "d-inline-block");

      alert.innerHTML = "All inputs is required";
      break;

    default:
      alert.classList.replace("d-inline-block", "d-none");
      if (regex.test(emailInput.value) == false) {
        alert.classList.replace("d-none", "d-inline-block");
        alert.innerHTML = "enter valid email";
      } else {
        searchIsEmailExist();
        if (isExist) {
          alert.classList.replace("d-none", "d-inline-block");
          alert.classList.replace("text-success", "text-danger");
          alert.innerHTML = "email is exist";
          console.log("exist");
        } else {
          var user = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
          };
          userContainer.push(user);
          localStorage.setItem("user", JSON.stringify(userContainer));
          alert.classList.replace("d-none", "d-inline-block");
          alert.classList.replace("text-danger", "text-success");
          alert.innerHTML = "Success";
        }
      }
  }
}

var isExist;
function searchIsEmailExist() {
  for (var i = 0; i < userContainer.length; i++) {
    if (userContainer[i].email == emailInput.value) {
      isExist = true;
      break;
    } else {
      console.log(" not exist Success");
      isExist = false;
    }
  }
}
