import { web3 } from "@/contractData";
import { poolAbi } from "@/contractsData/poolData";
import { tokenAbi } from "@/contractsData/tokenData";
import store from "@/store";
export default function getTokensOnPool() {
    const address = store.state.auth.address;
    const asyncCall = async (pool) => {
        let tokensList = [];

            const poolContract = new web3.eth.Contract(poolAbi, pool);
            const poolData = await poolContract.methods.getPoolData().call({"from": address});
            const symbols = [];
            const tokens = [poolData.first, poolData.second];
            for (let i = 0; i != 2; i++) {
                const tokenContract = new web3.eth.Contract(tokenAbi, tokens[i]);
                const symbol = await tokenContract.methods.symbol().call({"from": address});
                symbols.push(symbol);
            }
            tokensList.push({name: symbols[0], value: poolData.first})
            tokensList.push({name: symbols[1], value: poolData.second})


            return {tokensList}
        
    }

    return {asyncCall};
}