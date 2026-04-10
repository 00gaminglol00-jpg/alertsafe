import List "mo:core/List";
import ResourceLib "../lib/resources";
import ResTypes "../types/resources";

mixin (resources : List.List<ResourceLib.Resource>) {
  public query func getResources() : async [ResTypes.Resource] {
    ResourceLib.allResources(resources);
  };

  public query func getResourcesByType(resourceType : Text) : async [ResTypes.Resource] {
    ResourceLib.filteredByType(resources, resourceType);
  };
};
