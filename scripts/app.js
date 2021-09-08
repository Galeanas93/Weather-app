const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();
console.log(forecast);

const updateUi = data => {
  //destructure properties
  const { cityDeets, weather } = data; //  this stores both the cityDeets and weather data in a variable of the same name
  console.log(cityDeets, weather);
  //update details template
  details.innerHTML =
    // this creates a string template ands injects the date from out cityDeets and weather variables to our details vriable which references an html element with the class of .details.
    ` 
<h1 class="my-3">${
      cityDeets.EnglishName /*grabs the english name porperty from cityDeets and passes it into the h5 */
    }</h1> 
<div class="my-3">${
      weather.WeatherText /*grabs the weather text porperty from weather and passes it into the div*/
    }</div>
<div class="display-4 my-4">
  <span>${
    weather.Temperature.Imperial
      .Value /*grabs the temperature imperial value porperty from Weather and passes it into the span */
  }</span>
  <span>&deg;F</span>
</div>
`;

  // update the night and day & icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`; // creates a string template that is the src of the icon and changes depending on what number the weather icon property returns.
  icon.setAttribute("src", iconSrc); // takes the iconSrc variable and sets the attribute of the img tag to its value

  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg"; // this is a turnary operator that acts as a if statement saying if the property of isDayTime returns true the first first value gets stored if false the second value.
  time.setAttribute("src", timeSrc); // selects the time variable which is the reference to the img tag with the class of time and sets its src attribute to the timeSrc variable.

  //remove d-none if present
  if (card.classList.contains("d-none")) {
    // before the function is done it checks to see if card has the class of d-none and if it is truthy it will remove it to make the card visible
    card.classList.remove("d-none");
  }
};

cityForm.addEventListener("submit", e => {
  //gives us the ability to submit the input
  //prevent default action
  e.preventDefault(); // stops the submit from going through with default action which is to refresh the page.

  //get  city value
  const city = cityForm.city.value.trim(); // saves the city that was entered into the input field in a city variable
  cityForm.reset(); // clears the form after we have it stored in city variable

  //update the ui with new city
  forecast
    .updateCity(city) //calls updateCity which is in the forcast class with the paramater of city which will be whatever we get as a return from the getCity()
    .then(data => {
      // then we take that data and pass it into updateUi(data)
      updateUi(data); // this calls the updateUi method above ^  with the updateCity return
    })
    .catch(err => {
      console.log(err);
    });
  //set local storage
  localStorage.setItem("city", city); // this stores the value of the variable city in local storage under the name "city".
});

if (localStorage.getItem("city")) {
  // this loads up the program with the data from localStorage
  forecast
    .updateCity(localStorage.getItem("city"))
    .then(data => {
      updateUi(data);
    })
    .catch(err => {
      console.log(err);
    });
}
