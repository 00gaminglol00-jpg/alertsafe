import List "mo:core/List";
import Time "mo:core/Time";
import ContactTypes "../types/contacts";

module {
  public type ContactSubmission = ContactTypes.ContactSubmission;

  public func submit(
    contacts : List.List<ContactSubmission>,
    nextId : Nat,
    name : Text,
    email : Text,
    message : Text,
  ) : Nat {
    contacts.add({
      id = nextId;
      name;
      email;
      message;
      submittedAt = Time.now();
    });
    nextId + 1;
  };

  public func allContacts(contacts : List.List<ContactSubmission>) : [ContactSubmission] {
    contacts.toArray();
  };
};
