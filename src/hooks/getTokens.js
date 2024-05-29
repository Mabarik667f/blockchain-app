import { web3 } from "@/contractData";
import { factory } from "@/contractsData/factoryData";
import { tokenAbi } from "@/contractsData/tokenData";
import store from "@/store";
export default function getTokens() {
    const address = store.state.auth.address;
    const asyncCall = async () => {
        let tokensList = [];
        const tokens = await factory.methods.getTokens().call({'from': address});
        for (let token of tokens) {
            const contract = new web3.eth.Contract(tokenAbi, token);
            const symbol = await contract.methods.symbol().call({'from': address});
            let tokenObj = {name: symbol, value: token};
            tokensList.push(tokenObj);
        }
        return {tokensList}
    }

    return {asyncCall};
}