import Text "mo:base/Text";
import Principal "mo:base/Principal";
module {

    public type UserId = Text;

    public type User = {
        principalId : Principal;
        body: ?UserBody;
        created : Int;
    };

    type UserBody = {
        firstName : Text;
        lastName : Text;
        email : Text;
        phoneNumber : Nat;
        isUpdated : Bool;
        isEmailVerified : Bool;
        isPhoneNumberVerified : Bool;
    };
};