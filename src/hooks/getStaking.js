import store from "@/store"
import {stakingAbi} from "@/contractsData/stakingData";
import {factory} from "@/contractsData/factoryData"
import { web3 } from "@/contractData";
export default function getStaking() {
    const address = store.state.auth.address;
    const asyncCall = async() => {
        const stakingAddress = await factory.methods.getStaking().call({'from': address});
        const contract = new web3.eth.Contract(stakingAbi, stakingAddress);
        const staking = await contract.methods.getStakingData().call({'from': address});
        const res = {
            tokens: staking.tokens,
            lastReward: staking.lastReward
        }

        return {res}
    }

    return {asyncCall}
}