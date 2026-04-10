import List "mo:core/List";
import ContactLib "../lib/contacts";
import ContactTypes "../types/contacts";

mixin (contacts : List.List<ContactLib.ContactSubmission>, nextContactId : [var Nat]) {
  public func submitContact(name : Text, email : Text, message : Text) : async () {
    nextContactId[0] := ContactLib.submit(contacts, nextContactId[0], name, email, message);
  };

  public query func getContacts() : async [ContactTypes.ContactSubmission] {
    ContactLib.allContacts(contacts);
  };
};
