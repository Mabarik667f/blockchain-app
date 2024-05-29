import store from "@/store"
import {poolAbi} from "@/contractsData/poolData";
import {tokenAbi} from "@/contractsData/tokenData"
import {factory} from "@/contractsData/factoryData"
import { web3 } from "@/contractData";
export default function getPools() {
    const address = store.state.auth.address;
    const asyncCall = async() => {
        const res = [];
        const pools = await factory.methods.getPools().call({'from': address});
        for (let pool of pools) {
            const contract = new web3.eth.Contract(poolAbi, pool);
            const poolData = await contract.methods.getPoolData().call({"from": address});
            const tokens = [poolData.first, poolData.second];
            const symbols = [];
            for (let i = 0; i != 2; i++) {
                const tokenContract = new web3.eth.Contract(tokenAbi, tokens[i]);
                const symbol = await tokenContract.methods.symbol().call({"from": address});
                symbols.push(symbol);
            }
            const supporters = await contract.methods.getSupporters().call({"from": address})
            const poolObject = {
                address: pool,
                name: poolData.name,
                owner: poolData.owner,
                first: symbols[0],
                second: symbols[1],
                ratioETh: `${poolData.firstETH}:${poolData.secondETH}`,
                ratioTokens: `${poolData.firstTokens}:${poolData.secondTokens}`,
                supporters: supporters
            }
            res.push(poolObject)
        }

        return {res}
    }

    return {asyncCall}
}