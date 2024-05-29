import { factory } from "@/contractsData/factoryData"
import store from "@/store"

export default function createPool() {
    const asyncCall = async(formData) => {
        const address = store.state.auth.address;
        await factory.methods.addPool(formData.name, formData.token1, formData.token2, formData.amount1, formData.amount2, address).send({'from': address});
    }

    return {asyncCall}
}