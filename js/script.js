document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#passwrd").addEventListener("click", displayPwd);
document.querySelector("#signupForm").addEventListener("submit", function (event) {
    validateForm(event);
});

async function displayCity() {
    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    if (!data) {
        document.querySelector("#zipError").innerHTML = "Zipcode not found";
    } else {
        document.querySelector("#city").innerHTML = data.city;
        document.querySelector("#latitude").innerHTML = data.latitude;
        document.querySelector("#longitude").innerHTML = data.longitude;
    }
}

async function displayCounties() {
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option> Select County </option>";
    for (let i = 0; i < data.length; i++) {
        countyList.innerHTML += `<option> ${data[i].county}</option>`;
    }
}

async function checkUsername() {
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let usernameError = document.querySelector("#usernameError");
    if (data.available) {
        usernameError.innerHTML = " Username available";
        usernameError.style.color = "green";
    } else {
        usernameError.innerHTML = " Username taken";
        usernameError.style.color = "red";
    }
}

displayStates();

async function displayStates() {
    let url = `https://csumb.space/api/allStatesAPI.php`;
    let response = await fetch(url);
    let data = await response.json();
    let option = document.createElement("option");
    option.innerText = " - select a state -";
    option.value = "0";
    document.querySelector("#state").appendChild(option);

    for (let state of data) {
        let option = document.createElement("option");
        option.innerText = state.state;
        option.value = state.usps;
        document.querySelector("#state").appendChild(option);
    }
}

async function displayPwd() {
    let url = `https://csumb.space/api/suggestedPassword.php?length=6`;
    let response = await fetch(url);
    let data = await response.json();
    let suggestedPwd = document.querySelector("#suggestedPwd");
    suggestedPwd.innerHTML = `Suggestion: ${data.password}`;
}

function validateForm(e) {
    let isValid = true;
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#passwrd").value;
    let password2 = document.querySelector("#passwrd2").value;
    if (username.length == 0) {
        document.querySelector("#usernameError").innerHTML = "Username Required";
        document.querySelector("#usernameError").style.color = "red";
        isValid = false;
    }
    if (password.length == 0) {
        document.querySelector("#passwordError").innerHTML = "You must enter a password";
        document.querySelector("#passwordError").style.color = "red";
        isValid = false;
    }
    else if (password.length < 6) {
        document.querySelector("#passwordError").innerHTML = "Password must be as least 6 characters";
        document.querySelector("#passwordError").style.color = "orange";
        isValid = false;
    }
    if (password !== password2) {
        document.querySelector("#passwordError").innerHTML = "Passwords do not match";
        document.querySelector("#passwordError").style.color = "orange";
        isValid = false;
    }
    if (!isValid) {
        e.preventDefault();
    }
}

