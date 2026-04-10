import List "mo:core/List";
import Common "../types/common";
import WxTypes "../types/weather";

module {
  public type Weather = WxTypes.Weather;
  public type ForecastEntry = WxTypes.ForecastEntry;

  public func seed(weatherRecords : List.List<Weather>) {
    let forecast : [ForecastEntry] = [
      { time = "12:00"; condition = #cloudy },
      { time = "14:00"; condition = #rainy },
      { time = "16:00"; condition = #stormy },
      { time = "18:00"; condition = #rainy },
      { time = "20:00"; condition = #cloudy },
      { time = "22:00"; condition = #cloudy },
      { time = "00:00"; condition = #cloudy },
      { time = "02:00"; condition = #cloudy },
      { time = "04:00"; condition = #sunny },
      { time = "06:00"; condition = #sunny },
      { time = "08:00"; condition = #sunny },
      { time = "10:00"; condition = #cloudy },
      { time = "12:00"; condition = #rainy },
      { time = "14:00"; condition = #rainy },
      { time = "16:00"; condition = #cloudy },
      { time = "18:00"; condition = #sunny },
      { time = "20:00"; condition = #sunny },
      { time = "22:00"; condition = #cloudy },
      { time = "00:00"; condition = #cloudy },
      { time = "02:00"; condition = #rainy },
      { time = "04:00"; condition = #stormy },
      { time = "06:00"; condition = #stormy },
      { time = "08:00"; condition = #rainy },
      { time = "10:00"; condition = #cloudy },
      { time = "12:00"; condition = #sunny },
      { time = "14:00"; condition = #sunny },
      { time = "16:00"; condition = #sunny },
      { time = "18:00"; condition = #cloudy },
      { time = "20:00"; condition = #cloudy },
      { time = "22:00"; condition = #rainy },
      { time = "00:00"; condition = #rainy },
      { time = "02:00"; condition = #cloudy },
      { time = "04:00"; condition = #cloudy },
      { time = "06:00"; condition = #sunny },
      { time = "08:00"; condition = #sunny },
      { time = "10:00"; condition = #sunny },
      { time = "12:00"; condition = #cloudy },
      { time = "14:00"; condition = #rainy },
      { time = "16:00"; condition = #rainy },
      { time = "18:00"; condition = #cloudy },
      { time = "20:00"; condition = #sunny },
      { time = "22:00"; condition = #sunny },
      { time = "00:00"; condition = #cloudy },
      { time = "02:00"; condition = #cloudy },
      { time = "04:00"; condition = #rainy },
      { time = "06:00"; condition = #stormy },
      { time = "08:00"; condition = #rainy },
      { time = "10:00"; condition = #cloudy },
    ];
    weatherRecords.add({
      location = "Dhaka, Bangladesh";
      temperature = 32;
      condition = #rainy;
      humidity = 85;
      windSpeed = 28;
      forecast;
    });
  };

  public func currentWeather(weatherRecords : List.List<Weather>) : ?Weather {
    weatherRecords.first();
  };
};
