module {
  public type Timestamp = Int;
  public type Severity = { #danger; #warning; #safe };
  public type AlertType = { #flood; #storm; #cyclone; #earthquake };
  public type ResourceType = { #hospital; #shelter; #police; #fire; #supply };
  public type WeatherCondition = { #sunny; #cloudy; #rainy; #stormy };
};
