const form = document.getElementById("weatherform");
const cityInput = document.getElementById("cityInput");
const resultDiv = document.getElementById("weatherResult");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // prevents the form from submitting;
  const city = cityInput.value.trim(); // input value from the form
  if (!city) return; // if somebody submits the empty field

  const apiKey = "270ba20664e95f074f906b27a4b382c8";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Lets do the try catch statement
  try {
    const response = await fetch(url); // fetching the info from the data
    if (!response.ok) {
      throw new Error("City not found!");
    }

    const data = await response.json(); // convert response to json
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    resultDiv.innerHTML = `<h2>${data.name}</h2>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
    <p><strong>${temp}°C</strong></p>
  <p>${description}</p>`;
    resultDiv.classList.remove("hidden");
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
    resultDiv.classList.remove("hidden");
  }
});
