import Common "common";

module {
  public type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    submittedAt : Common.Timestamp;
  };
};
