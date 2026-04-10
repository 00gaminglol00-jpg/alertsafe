import List "mo:core/List";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Common "../types/common";
import AlertTypes "../types/alerts";

module {
  public type Alert = AlertTypes.Alert;

  func severityRank(s : Common.Severity) : Nat {
    switch s {
      case (#danger) 0;
      case (#warning) 1;
      case (#safe) 2;
    };
  };

  func alertTypeToText(t : Common.AlertType) : Text {
    switch t {
      case (#flood) "flood";
      case (#storm) "storm";
      case (#cyclone) "cyclone";
      case (#earthquake) "earthquake";
    };
  };

  public func compareAlerts(a : Alert, b : Alert) : Order.Order {
    let sr = Nat.compare(severityRank(a.severity), severityRank(b.severity));
    switch sr {
      case (#equal) Int.compare(b.issuedAt, a.issuedAt); // desc by issuedAt
      case other other;
    };
  };

  public func seed(alerts : List.List<Alert>) {
    let now = Time.now();
    let items : [Alert] = [
      {
        id = 1;
        alertType = #flood;
        title = "Severe Flash Flood Warning";
        location = "Dhaka, Bangladesh";
        severity = #danger;
        issuedAt = now - 3_600_000_000_000;
        affectedArea = "Low-lying areas along Buriganga River, Demra, Jatrabari";
        recommendedActions = ["Evacuate immediately to higher ground", "Avoid walking or driving through floodwaters", "Move valuables to upper floors", "Contact emergency services: 999"];
        affectedPopulation = 250_000;
      },
      {
        id = 2;
        alertType = #cyclone;
        title = "Cyclone Mocha Approaching Coastline";
        location = "Cox's Bazar, Bangladesh";
        severity = #danger;
        issuedAt = now - 7_200_000_000_000;
        affectedArea = "Coastal belt from Cox's Bazar to Chittagong, including offshore islands";
        recommendedActions = ["Move to designated cyclone shelters immediately", "Stay away from coastal areas and rivers", "Secure or bring inside all loose outdoor items", "Stock at least 3 days of food and water"];
        affectedPopulation = 1_200_000;
      },
      {
        id = 3;
        alertType = #storm;
        title = "Severe Thunderstorm Alert";
        location = "Mumbai, India";
        severity = #warning;
        issuedAt = now - 1_800_000_000_000;
        affectedArea = "Greater Mumbai Metropolitan Area, Thane, Navi Mumbai";
        recommendedActions = ["Stay indoors and away from windows", "Avoid using electrical appliances", "Do not take shelter under trees", "Monitor official weather updates"];
        affectedPopulation = 3_500_000;
      },
      {
        id = 4;
        alertType = #earthquake;
        title = "Magnitude 5.8 Earthquake";
        location = "Kathmandu, Nepal";
        severity = #danger;
        issuedAt = now - 10_800_000_000_000;
        affectedArea = "Kathmandu Valley, Bhaktapur, Lalitpur districts";
        recommendedActions = ["Drop, Cover, and Hold On", "Move away from buildings and power lines", "Expect aftershocks", "Check for gas leaks before using utilities"];
        affectedPopulation = 800_000;
      },
      {
        id = 5;
        alertType = #flood;
        title = "River Flooding Advisory";
        location = "Sylhet, Bangladesh";
        severity = #warning;
        issuedAt = now - 14_400_000_000_000;
        affectedArea = "Sylhet Sadar, Jaintiapur, Gowainghat along Surma River";
        recommendedActions = ["Prepare emergency kit and documents", "Monitor water levels closely", "Keep vehicles ready for quick evacuation", "Identify nearest shelter locations"];
        affectedPopulation = 180_000;
      },
      {
        id = 6;
        alertType = #storm;
        title = "Coastal Storm Warning";
        location = "Chennai, India";
        severity = #warning;
        issuedAt = now - 5_400_000_000_000;
        affectedArea = "Marina Beach area, Mylapore, Adyar, Velachery";
        recommendedActions = ["Avoid coastal areas and beaches", "Fishermen should not venture into sea", "Secure fishing boats and equipment", "Follow local authority instructions"];
        affectedPopulation = 450_000;
      },
      {
        id = 7;
        alertType = #cyclone;
        title = "Cyclone Watch Issued";
        location = "Visakhapatnam, India";
        severity = #warning;
        issuedAt = now - 21_600_000_000_000;
        affectedArea = "Northern Andhra Pradesh coastline, 200km radius from Visakhapatnam";
        recommendedActions = ["Monitor weather bulletins every 6 hours", "Prepare emergency supplies", "Identify sturdy shelter locations", "Keep important documents in waterproof bags"];
        affectedPopulation = 600_000;
      },
      {
        id = 8;
        alertType = #earthquake;
        title = "Minor Earthquake Tremors";
        location = "Assam, India";
        severity = #safe;
        issuedAt = now - 43_200_000_000_000;
        affectedArea = "Guwahati and surrounding districts";
        recommendedActions = ["Stay alert for aftershocks", "Inspect buildings for cracks", "Report structural damage to authorities"];
        affectedPopulation = 50_000;
      },
      {
        id = 9;
        alertType = #flood;
        title = "Monsoon Overflow Alert";
        location = "Patna, Bihar, India";
        severity = #danger;
        issuedAt = now - 2_700_000_000_000;
        affectedArea = "Flood plains of Ganga and Gandak rivers, North Bihar districts";
        recommendedActions = ["Evacuate flood-prone zones immediately", "Move livestock to safe areas", "Do not wade through fast-moving water", "Contact District Disaster Management: 0612-2223456"];
        affectedPopulation = 500_000;
      },
      {
        id = 10;
        alertType = #storm;
        title = "Hailstorm Warning";
        location = "Kolkata, India";
        severity = #safe;
        issuedAt = now - 86_400_000_000_000;
        affectedArea = "North Kolkata, Howrah, Hooghly districts";
        recommendedActions = ["Park vehicles in covered areas", "Avoid outdoor activities during storm", "Keep pets indoors", "Check roof integrity after storm passes"];
        affectedPopulation = 120_000;
      },
      {
        id = 11;
        alertType = #cyclone;
        title = "Cyclone Season Preparedness";
        location = "Odisha Coast, India";
        severity = #safe;
        issuedAt = now - 172_800_000_000_000;
        affectedArea = "Entire Odisha coastline from Balasore to Ganjam";
        recommendedActions = ["Review your emergency plan", "Stock up on essential supplies", "Register with local disaster management authority", "Know your nearest cyclone shelter"];
        affectedPopulation = 200_000;
      },
    ];
    for (item in items.vals()) {
      alerts.add(item);
    };
  };

  public func sortedAlerts(alerts : List.List<Alert>) : [Alert] {
    let sorted = alerts.sort(compareAlerts);
    sorted.toArray();
  };

  public func filteredByType(alerts : List.List<Alert>, alertType : Text) : [Alert] {
    let matched = alerts.filter(func(a : Alert) : Bool {
      alertTypeToText(a.alertType) == alertType
    });
    let sorted = matched.sort(compareAlerts);
    sorted.toArray();
  };
};
