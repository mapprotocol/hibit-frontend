import {InjectedConnector} from "wagmi/connectors/injected";

class BefiConnector extends InjectedConnector {
    readonly id = "befi";
    readonly name = "Befi wallet";
    constructor() {
        super();
    }

    // async connect({chainId}: {chainId?: number}) {
    //     return super.connect({chainId: chainId || 1});
    // }
}

export default BefiConnector;
