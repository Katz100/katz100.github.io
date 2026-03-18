document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displatCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#password").addEventListener("click", suggestPassword);
document.querySelector("#signupForm").addEventListener("submit", function (event) {
    validateForm(event);
});

function validateForm(e) {
    let isValid = true;
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let passwordAgain = document.querySelector("#passwordAgain").value;

    document.querySelector("#usernameError").innerHTML = "";
    document.querySelector("#passwordError").innerHTML = "";

    if (username.length == 0) {
        document.querySelector("#usernameError").innerHTML = "Username required!";
        isValid = false;
    } else {
        document.querySelector("#usernameError").innerHTML = "";
    }

    if (password.length < 6) {
        document.querySelector("#passwordError").innerHTML = "Password must have at least 6 characters";
        isValid = false;
    } else if (password !== passwordAgain) {
        document.querySelector("#passwordError").innerHTML = "Passwords must match";
        isValid = false;
    }


    if (!isValid) {
        e.preventDefault();
    }
}

async function getStates() {
    let states = document.querySelector("#state")
    let url = `https://csumb.space/api/allStatesAPI.php`;
    let response = await fetch(url);
    let statesJson = await response.json();

    for (let state of statesJson) {
        states.innerHTML += `<option value = '${state.usps}'>${state.state}</option>`;
    }

}

getStates();

async function suggestPassword() {
    let password = document.querySelector("#password").value;
    let url = `https://csumb.space/api/suggestedPassword.php?length=8`;
    let response = await fetch(url);
    let data = await response.json();
    document.querySelector("#suggestedPwd").innerHTML = `<b>${data.password}</b>`;
}

async function displayCity() {
    // alert(document.querySelector("#zip").value);

    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();

    if (!data) {
        document.querySelector("#city").innerHTML = "Zip is not valid!"
    } else {
    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#lat").innerHTML = data.latitude;
    document.querySelector("#long").innerHTML = data.longitude;
    }

}

async function displatCounties() {
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();

    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option> Select County </option>";
    for (let i of data) {
        countyList.innerHTML += `<option>${i.county}</option>`;
    }
}

async function checkUsername() {
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let usernameError = document.querySelector("#usernameError");
    if (data.available) {
        usernameError.innerHTML = " Username available!";
        usernameError.style.color = "green";
    } else {
        usernameError.innerHTML = " Username taken";
        usernameError.style.color = "red";
    }
}