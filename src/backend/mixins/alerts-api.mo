import List "mo:core/List";
import AlertLib "../lib/alerts";
import AlertTypes "../types/alerts";

mixin (alerts : List.List<AlertLib.Alert>) {
  public query func getAlerts() : async [AlertTypes.Alert] {
    AlertLib.sortedAlerts(alerts);
  };

  public query func getAlertsByType(alertType : Text) : async [AlertTypes.Alert] {
    AlertLib.filteredByType(alerts, alertType);
  };
};
