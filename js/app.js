// --------------------------------------------------------------------------------------------
// Listen for page load
// --------------------------------------------------------------------------------------------
window.addEventListener("load", () => {
  // --------------------------------------------------------------------------------------------
  // Variables
  // --------------------------------------------------------------------------------------------
  let long;
  let lat;
  const temperatureDescription = document.querySelector(".temperature-description");
  const temperatureDegree = document.querySelector(".temperature-degree");
  const locationTimezone = document.querySelector(".location-timezone");
  const windspeedSection = document.querySelector(".windspeed");
  // --------------------------------------------------------------------------------------------
  // Get location information from users browser
  // --------------------------------------------------------------------------------------------
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      // --------------------------------------------------------------------------------------------
      // CORS Error resolution for local host
      // --------------------------------------------------------------------------------------------
      const proxy = "http://cors-anywhere.herokuapp.com/";
      // --------------------------------------------------------------------------------------------
      // Darksky API
      // --------------------------------------------------------------------------------------------
      const api = `${proxy}https://api.darksky.net/forecast/b18bd104f4ae8d4a532c3df0a4a9a0bb/${lat},${long}`;
      // --------------------------------------------------------------------------------------------
      // Fetch JSON Data
      // --------------------------------------------------------------------------------------------
      fetch(api)
        .then(response => {
          return response.json();
        })
        // --------------------------------------------------------------------------------------------
        // set DOM elements from API
        // --------------------------------------------------------------------------------------------
        .then(data => {
          const { temperature, summary, icon, windSpeed } = data.currently;
          temperatureDegree.textContent = `Current temperature is ${Math.floor((temperature - 32) * (5 / 9))}`;
          temperatureDescription.textContent = `Today is ${summary}`;
          locationTimezone.textContent = data.timezone;
          windspeedSection.textContent = `Todays wind speed is ${Math.floor(windSpeed)} mph`;
          // --------------------------------------------------------------------------------------------
          // Set Skycon Icon
          // --------------------------------------------------------------------------------------------
          setIcons(icon, document.querySelector(".icon"));
        });
    });
  }

  // --------------------------------------------------------------------------------------------
  // Add Skycons
  // --------------------------------------------------------------------------------------------
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
