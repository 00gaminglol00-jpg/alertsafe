import List "mo:core/List";
import AlertLib "lib/alerts";
import ResourceLib "lib/resources";
import WeatherLib "lib/weather";
import ContactLib "lib/contacts";
import AlertsMixin "mixins/alerts-api";
import ResourcesMixin "mixins/resources-api";
import WeatherMixin "mixins/weather-api";
import ContactsMixin "mixins/contacts-api";

actor {
  let alerts = List.empty<AlertLib.Alert>();
  let resources = List.empty<ResourceLib.Resource>();
  let weatherRecords = List.empty<WeatherLib.Weather>();
  let contacts = List.empty<ContactLib.ContactSubmission>();
  var nextContactId : Nat = 1;

  AlertLib.seed(alerts);
  ResourceLib.seed(resources);
  WeatherLib.seed(weatherRecords);

  include AlertsMixin(alerts);
  include ResourcesMixin(resources);
  include WeatherMixin(weatherRecords);
  include ContactsMixin(contacts, [var nextContactId]);
};
