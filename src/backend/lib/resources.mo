import List "mo:core/List";
import Common "../types/common";
import ResTypes "../types/resources";

module {
  public type Resource = ResTypes.Resource;

  func resourceTypeToText(t : Common.ResourceType) : Text {
    switch t {
      case (#hospital) "hospital";
      case (#shelter) "shelter";
      case (#police) "police";
      case (#fire) "fire";
      case (#supply) "supply";
    };
  };

  public func seed(resources : List.List<Resource>) {
    let items : [Resource] = [
      {
        id = 1;
        name = "Dhaka Medical College Hospital";
        resourceType = #hospital;
        address = "Bakshibazar, Dhaka 1000";
        phone = "+880-2-55165088";
        lat = 23.7246;
        lng = 90.3936;
        hoursOfOperation = "24/7 Emergency";
        distanceKm = 2.3;
      },
      {
        id = 2;
        name = "Mirpur Government Cyclone Shelter";
        resourceType = #shelter;
        address = "Mirpur Section 10, Dhaka 1216";
        phone = "+880-2-8031234";
        lat = 23.8041;
        lng = 90.3677;
        hoursOfOperation = "Open during emergencies";
        distanceKm = 5.8;
      },
      {
        id = 3;
        name = "Ramna Police Station";
        resourceType = #police;
        address = "Ramna, Dhaka 1000";
        phone = "999 / +880-2-9330099";
        lat = 23.7341;
        lng = 90.4045;
        hoursOfOperation = "24/7";
        distanceKm = 3.1;
      },
      {
        id = 4;
        name = "Tejgaon Fire Station";
        resourceType = #fire;
        address = "Tejgaon Industrial Area, Dhaka 1208";
        phone = "199 / +880-2-9110011";
        lat = 23.7648;
        lng = 90.3990;
        hoursOfOperation = "24/7";
        distanceKm = 4.5;
      },
      {
        id = 5;
        name = "Red Crescent Emergency Supply Hub";
        resourceType = #supply;
        address = "Mohakhali, Dhaka 1212";
        phone = "+880-2-9884661";
        lat = 23.7793;
        lng = 90.4046;
        hoursOfOperation = "8:00 AM - 8:00 PM (emergency 24/7)";
        distanceKm = 6.2;
      },
      {
        id = 6;
        name = "Cox's Bazar Sadar Hospital";
        resourceType = #hospital;
        address = "Hospital Road, Cox's Bazar 4700";
        phone = "+880-341-63333";
        lat = 21.4272;
        lng = 92.0058;
        hoursOfOperation = "24/7 Emergency";
        distanceKm = 12.7;
      },
      {
        id = 7;
        name = "Teknaf Cyclone Preparedness Center";
        resourceType = #shelter;
        address = "Teknaf, Cox's Bazar 4761";
        phone = "+880-341-75432";
        lat = 20.8624;
        lng = 92.3044;
        hoursOfOperation = "Open during declared emergencies";
        distanceKm = 18.4;
      },
      {
        id = 8;
        name = "KSRM Emergency Relief Center";
        resourceType = #supply;
        address = "Chittagong Port Area, Chittagong 4100";
        phone = "+880-31-2857890";
        lat = 22.3394;
        lng = 91.8349;
        hoursOfOperation = "7:00 AM - 10:00 PM";
        distanceKm = 9.0;
      },
      {
        id = 9;
        name = "Chittagong Medical College Hospital";
        resourceType = #hospital;
        address = "K.B. Fazlul Kader Road, Chittagong 4203";
        phone = "+880-31-657270";
        lat = 22.3734;
        lng = 91.8373;
        hoursOfOperation = "24/7 Emergency";
        distanceKm = 11.2;
      },
      {
        id = 10;
        name = "Khulna City Corporation Shelter";
        resourceType = #shelter;
        address = "KDA Avenue, Khulna 9000";
        phone = "+880-41-721111";
        lat = 22.8456;
        lng = 89.5403;
        hoursOfOperation = "Open during emergencies";
        distanceKm = 7.5;
      },
      {
        id = 11;
        name = "Rajshahi Fire Service Station";
        resourceType = #fire;
        address = "Station Road, Rajshahi 6000";
        phone = "199 / +880-721-771199";
        lat = 24.3745;
        lng = 88.6042;
        hoursOfOperation = "24/7";
        distanceKm = 3.8;
      },
      {
        id = 12;
        name = "Sylhet Kotwali Police Station";
        resourceType = #police;
        address = "Zinda Bazar, Sylhet 3100";
        phone = "999 / +880-821-716141";
        lat = 24.8998;
        lng = 91.8716;
        hoursOfOperation = "24/7";
        distanceKm = 2.9;
      },
      {
        id = 13;
        name = "BRAC Flood Emergency Supply Point";
        resourceType = #supply;
        address = "Gazipur, Dhaka 1700";
        phone = "+880-2-9881265";
        lat = 23.9999;
        lng = 90.4122;
        hoursOfOperation = "During active flood emergency";
        distanceKm = 14.3;
      },
      {
        id = 14;
        name = "MAG Osmani Medical College Hospital";
        resourceType = #hospital;
        address = "Sylhet Sadar, Sylhet 3100";
        phone = "+880-821-716785";
        lat = 24.8961;
        lng = 91.8753;
        hoursOfOperation = "24/7 Emergency";
        distanceKm = 3.4;
      },
      {
        id = 15;
        name = "Narayanganj Disaster Shelter Complex";
        resourceType = #shelter;
        address = "Fatullah, Narayanganj 1400";
        phone = "+880-2-7641098";
        lat = 23.6238;
        lng = 90.4997;
        hoursOfOperation = "Open during emergencies";
        distanceKm = 8.6;
      },
    ];
    for (item in items.vals()) {
      resources.add(item);
    };
  };

  public func allResources(resources : List.List<Resource>) : [Resource] {
    resources.toArray();
  };

  public func filteredByType(resources : List.List<Resource>, resourceType : Text) : [Resource] {
    resources.filter(func(r : Resource) : Bool {
      resourceTypeToText(r.resourceType) == resourceType
    }).toArray();
  };
};
