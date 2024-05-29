import { web3 } from "@/contractData"
import { poolAbi } from "@/contractsData/poolData"
import store from "@/store";
export default function supportPool() {
    const address = store.state.auth.address;
    const asyncCall = async (formData) => {
        const pool = new web3.eth.Contract(poolAbi, formData.pool);
        await pool.methods.supportPool(formData.token, formData.amount).send({'from': address});
    }
    return {asyncCall}
}