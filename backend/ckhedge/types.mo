import Text "mo:base/Text";
module {

    public type UserId = Text;

    public type User = {
        principalId : Text;
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