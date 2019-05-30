window.addEventListener("load", () => {
  let long;
  let lat;
  const temperatureDescription = document.querySelector(".temperature-description");
  const temperatureDegree = document.querySelector(".temperature-degree");
  const locationTimezone = document.querySelector(".location-timezone");
  const temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");
  const windspeedSection = document.querySelector(".windspeed");
  // const windspeedSpan = document.querySelector(".windspeed span");
  // Get location information from users browser
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      // CORS Error resolution for local host
      const proxy = "http://cors-anywhere.herokuapp.com/";

      // Darksky API
      const api = `${proxy}https://api.darksky.net/forecast/b18bd104f4ae8d4a532c3df0a4a9a0bb/${lat},${long}`;

      // Fetch JSON Data
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temperature, summary, icon, windSpeed } = data.currently;
          // set DOM elements from API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          windspeedSection.textContent = windSpeed;
          // Convert Farenheight to Celcius
          const celsius = (temperature - 32) * (5 / 9);
          // Set Icon
          setIcons(icon, document.querySelector(".icon"));

          // Change Temperature To Celcius
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }
  // skycons
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
