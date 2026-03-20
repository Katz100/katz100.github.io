async function validLocation(location) {
    let url = `http://api.weatherapi.com/v1/current.json?key=ca2cf58ade6a47579ac155427262003&q=${location}&aqi=no`;
    try {
        let response = await fetch(url);
        return response.ok;
    } catch (error) {
        return false;
    }
}

async function getWeatherData(location) {
    let url = `http://api.weatherapi.com/v1/current.json?key=ca2cf58ade6a47579ac155427262003&q=${location}&aqi=no`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        let weatherContent = document.querySelector("#weatherResult");
        weatherContent.classList.remove("d-none");
        document.querySelector("#cityName").textContent = data.location.name;
        document.querySelector("#temp").textContent = "Current temp: " + data.current.temp_f;
        document.querySelector("#wind").textContent = "Wind speed: " + data.current.wind_mph;

        let temp = data.current.temp_f;
        let txt = document.querySelector("#infoTxt")

        if (temp > 80) {
            document.querySelector("#weatherImg").src = "img/hot.jpg";
            txt.textContent = "Hot"
            txt.style.color = "red";
        } else if (temp > 40 && temp < 80) {
            document.querySelector("#weatherImg").src = "img/nice.jpg";
            txt.textContent = "Nice"
            txt.style.color = "Green";
        } else {
            document.querySelector("#weatherImg").src = "img/cold.jpg";
            txt.textContent = "Cold"
            txt.style.color = "Blue";
        }
    } catch (error) {
        alert("Error retrieving data");
    }
}
(function () {
    'use strict'

    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', async function (event) {
                event.preventDefault();
                event.stopPropagation();

                let input = document.querySelector("#locationTxt");
                let location = document.querySelector("#locationTxt").value;
                let isValid = true

                if (location === "") {
                    isValid = false;
                }

                if (isValid) {
                    isValid = await validLocation(location);
                }

                input.classList.remove("is-valid", "is-invalid");

                if (!isValid) {
                    input.classList.add("is-invalid");
                } else {
                    form.classList.add('was-validated');
                    getWeatherData(location);
                }
            }, false)
        })
})()