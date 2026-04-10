import Common "common";

module {
  public type ForecastEntry = {
    time : Text;
    condition : Common.WeatherCondition;
  };

  public type Weather = {
    location : Text;
    temperature : Int;
    condition : Common.WeatherCondition;
    humidity : Nat;
    windSpeed : Nat;
    forecast : [ForecastEntry];
  };
};
