import Types "types";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Debug "mo:base/Debug";
import List "mo:base/List";
import Principal "mo:base/Principal";
import IcWebSocketCdk "mo:ic-websocket-cdk";
import IcWebSocketCdkState "mo:ic-websocket-cdk/State";
import IcWebSocketCdkTypes "mo:ic-websocket-cdk/Types";

actor {

  type AppMessage = {
    message : Text;
  };

  type User = Types.User;
  type UserId = Types.UserId; // PrincipalId string

  stable var users = List.nil<User>();

  /************************************
  * SECTION: Users CRUD operations
  ************************************/

  public shared ({ caller }) func registerUser(payload : User) : async Result.Result<User, Text> {
    assert (not Principal.isAnonymous(caller));
     let user = List.find<User>(
            users,
            func(user : User) : Bool {
                return user.principalId == caller;
            },
        );
        switch (user) {
            case (null) {
                    users := List.push(payload, users);
                    return #ok(payload);
            };
            case (?_val) {
                return #err("User already exists");
            };
        };
  };

  public shared ({ caller }) func getUsers() : async [User] {
    assert (not Principal.isAnonymous(caller));
    List.toArray(users);
  };

public shared query ({caller}) func getMyProfile() : async Result.Result<User, Text> {
    let user = List.find<User>(
        users,
        func(user : User) : Bool {
            return user.principalId == caller;
        },
    );
    switch (user) {
        case (null) {
            return #err("User not found");
        };
        case (?val) {
            return #ok(val);
        };
    };
};

  func on_open(args : IcWebSocketCdk.OnOpenCallbackArgs) : async () {
    Debug.print("Client " # debug_show (args.client_principal) # " connected");
  };

  func on_message(args : IcWebSocketCdk.OnMessageCallbackArgs) : async () {
    Debug.print("Client " # debug_show (args.client_principal) # " sent message: " # debug_show (args.message));
  };

  func on_close(args : IcWebSocketCdk.OnCloseCallbackArgs) : async () {
    Debug.print("Client " # debug_show (args.client_principal) # " disconnected");
  };

  let params = IcWebSocketCdkTypes.WsInitParams(null, null);
  let ws_state = IcWebSocketCdkState.IcWebSocketState(params);

  let handlers = IcWebSocketCdkTypes.WsHandlers(
    ?on_open,
    ?on_message,
    ?on_close,
  );

  let ws = IcWebSocketCdk.IcWebSocket(ws_state, params, handlers);

  // method called by the WS Gateway after receiving FirstMessage from the client
  public shared ({ caller }) func ws_open(args : IcWebSocketCdk.CanisterWsOpenArguments) : async IcWebSocketCdk.CanisterWsOpenResult {
    await ws.ws_open(caller, args);
  };

  // method called by the Ws Gateway when closing the IcWebSocket connection
  public shared ({ caller }) func ws_close(args : IcWebSocketCdk.CanisterWsCloseArguments) : async IcWebSocketCdk.CanisterWsCloseResult {
    await ws.ws_close(caller, args);
  };

  // method called by the frontend SDK to send a message to the canister
  public shared ({ caller }) func ws_message(args : IcWebSocketCdk.CanisterWsMessageArguments, msg : ?AppMessage) : async IcWebSocketCdk.CanisterWsMessageResult {
    await ws.ws_message(caller, args, msg);
  };

  // method called by the WS Gateway to get messages for all the clients it serves
  public shared query ({ caller }) func ws_get_messages(args : IcWebSocketCdk.CanisterWsGetMessagesArguments) : async IcWebSocketCdk.CanisterWsGetMessagesResult {
    ws.ws_get_messages(caller, args);
  };

};
