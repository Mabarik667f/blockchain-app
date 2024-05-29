import store from "@/store"
import {factory} from "@/contractsData/factoryData"
import {web3} from "@/contractData"
export default function getUserData() {
    const asyncCall = async () => {
        const address = store.state.auth.address;
        const userData = await factory.methods.getTokenBalances().call({'from': address});
        const ethBalance = await web3.eth.getBalance(address);
        const res = {
            eth: web3.utils.fromWei(ethBalance, 'ether'),
            gerda: userData[0],
            krendel: userData[1],
            rtk: userData[2],
            lp: userData[3]
        }

        return {res}

    }

    return  {asyncCall}
}