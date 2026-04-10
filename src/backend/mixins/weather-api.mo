import List "mo:core/List";
import WeatherLib "../lib/weather";
import WxTypes "../types/weather";

mixin (weatherRecords : List.List<WeatherLib.Weather>) {
  public query func getWeather() : async ?WxTypes.Weather {
    WeatherLib.currentWeather(weatherRecords);
  };
};
