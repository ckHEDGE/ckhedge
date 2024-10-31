import Types "types";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import IcWebSocketCdk "mo:ic-websocket-cdk";
import IcWebSocketCdkState "mo:ic-websocket-cdk/State";
import IcWebSocketCdkTypes "mo:ic-websocket-cdk/Types";

actor {

   type AppMessage = {
    message : Text;
  };

  type User = Types.User;
  type UserId = Types.UserId; // PrincipalId string

  private stable var _stableUsers : [(UserId, User)] = [];
  var users = HashMap.HashMap<UserId, User>(0, Text.equal, Text.hash);

  /************************************
  * SECTION: Users CRUD operations
  ************************************/

  public shared func addUser(user : User) : async () {
    users.put(user.principalId, user);
  };

  public shared func getUser(userId : UserId) : async Result.Result<User, Text> {
    switch (users.get(userId)) {
      case (?user) {
        #ok(user);
      };
      case (null) {
        #err("User not found");
      };
    };
  };

  public shared func getUsers() : async [User] {
    Iter.toArray(users.vals());
  };

  public shared func updateUser(user : User) : async () {
    users.put(user.principalId, user);
  };

  public shared func removeUser(userId : UserId) : async () {
    users.delete(userId);
  };

  public shared func getUserCount() : async Int {
    users.size();
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
  public shared ({ caller }) func ws_message(args : IcWebSocketCdk.CanisterWsMessageArguments, msg:? AppMessage) : async IcWebSocketCdk.CanisterWsMessageResult {
    await ws.ws_message(caller, args, msg);
  };

  // method called by the WS Gateway to get messages for all the clients it serves
  public shared query ({ caller }) func ws_get_messages(args : IcWebSocketCdk.CanisterWsGetMessagesArguments) : async IcWebSocketCdk.CanisterWsGetMessagesResult {
    ws.ws_get_messages(caller, args);
  };

};
