class Forecast {
  constructor() {
    this.key = " r4NEaoa4ZjZO4wACaANCEjpGxQ3AfT3O";
    this.weatherURI =
      "http://dataservice.accuweather.com/currentconditions/v1/";
    this.cityURI =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
  }
  async updateCity(city) {
    const cityDeets = await this.getCity(city); // calls the getCity function that we created in weather.js and stores the value we get back into cityDeets.
    const weather = await this.getWeather(cityDeets.Key); // once cityDeets resolves we create a variable named weather and we pass in the key property we pull from cityDeets to get the weather updates from the city method.
    return {
      // here we are returning an object in wich both properties are equal to themselves.
      cityDeets,
      weather,
    };
  }

  //returns the city information for the city we call in the input field. and returns that information waitiong for the weather method to be called
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`; // query is the info such as apikey and city that get passed into the call so we know what info to pull
    const response = await fetch(this.cityURI + query); // this combines our base and query then fetches it. when the process is done data is stored in response constant.
    const data = await response.json(); // takes the response data and parses it so that we get back an object that we can work with rather than raw JSON data.
    return data[0]; // here we are returning the value of data at index 0 which would be the first object.
  }

  //makes a call to the weather api that takes in a city code and an apikey and parses the response to return an object at the 0 index
  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;
    const response = await fetch(this.weatherURI + query);
    const data = await response.json();
    return data[0];
  }
}
