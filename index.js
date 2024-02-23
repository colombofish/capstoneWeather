import express from "express"
import bodyParser from "body-parser"
import axios from "axios"

const appid = "ac9c13b0ca60b82aa92b84ef2aa9c5e2"; //use your own appid
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
})

app.post("/submit", async (req, res) => {
  // console.log(req.body.city);
  try {
    let url = `https://api.openweathermap.org/geo/1.0/direct?q=${req.body.city}, GBR&limit=1`;
    // Above API URL is to get the longitude and latitude based on the city name retrieved from the web form
    const cityName = req.body.city; // this to pass to the weatherReport
    const response = await axios.get(url, { params: { appid: appid } });
    // console.log(response.data[0].name, response.data[0].lat, response.data[0].lon);
    const response2 = await axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&units=metric`,
        { params: { appid: appid } });
    // Above API URL is to get the current weather report
    const report = response2.data;
    const weatherReport = {
      city: cityName,
      condition: report.weather[0].description,
      icon: report.weather[0].icon,
      temp: report.main.temp,
      feelsLike: report.main.feels_like,
      pressure: report.main.pressure,
      speed: report.wind.speed
    };
    // Seven types of values are stored in an object weatherReport and rendered to EJS

    res.render("index.ejs", { content: weatherReport });
  } catch (error) {
    console.log("Failed to make request: ", error.message);
  }
})

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
})