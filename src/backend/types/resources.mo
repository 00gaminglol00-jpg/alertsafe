import Common "common";

module {
  public type Resource = {
    id : Nat;
    name : Text;
    resourceType : Common.ResourceType;
    address : Text;
    phone : Text;
    lat : Float;
    lng : Float;
    hoursOfOperation : Text;
    distanceKm : Float;
  };
};
