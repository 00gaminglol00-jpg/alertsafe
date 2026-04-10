import Common "common";

module {
  public type Alert = {
    id : Nat;
    alertType : Common.AlertType;
    title : Text;
    location : Text;
    severity : Common.Severity;
    issuedAt : Common.Timestamp;
    affectedArea : Text;
    recommendedActions : [Text];
    affectedPopulation : Nat;
  };
};
