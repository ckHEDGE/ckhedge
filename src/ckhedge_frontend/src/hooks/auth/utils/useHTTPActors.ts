import { useState, useEffect } from "react";
import { Actor, ActorSubclass, HttpAgent } from "@dfinity/agent";
import { network } from "../../constants";
import { canisterId , idlFactory} from "../../../../../declarations/ckhedge_backend";
import { _SERVICE} from "../../../../../declarations/ckhedge_backend/ckhedge_backend.did";


const HOST = 'http://127.0.0.1:4943/'
const agent = await HttpAgent.create({
	host: process.env.DFX_NETWORK === "ic" ? "https://icp0.io" : HOST,
})

export const useHTTPActors = () => {
	const [backendHTTPActor, setBackendHTTPActor] = useState<ActorSubclass<_SERVICE> | null>(null);

	useEffect(() => {
		if (network !== "ic") {
			agent.fetchRootKey().catch((err) => {
				console.warn(
				"Unable to fetch root key. Check to ensure that your local replica is running"
				);
				console.error(err);
			});
		}

		const auctionActor = Actor.createActor<ActorSubclass<_SERVICE> | null>(idlFactory, {
			agent: agent,
			canisterId: canisterId,
		});
	
		setBackendHTTPActor(auctionActor);
	}, [])

	return { backendHTTPActor };
};