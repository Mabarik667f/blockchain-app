import { web3 } from "@/contractData"
import { factory } from "@/contractsData/factoryData";
import { stakingAbi } from "@/contractsData/stakingData"
import store from "@/store";
export default function supportPool() {
    const address = store.state.auth.address;
    const asyncCall = async () => {
        const stakingAddress = await factory.methods.getStaking().call({'from': address});
        const staking = new web3.eth.Contract(stakingAbi, stakingAddress);
        await staking.methods.getReward().send({'from': address});
    }
    return {asyncCall}
}