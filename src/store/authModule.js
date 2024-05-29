export const authModule = {
    state: ({
        isAuth: false,
        address: ''
    }),
    getters: {
        isAuth: state => state.isAuth,
        address: state => state.address
    },
    mutations: {
        setAuth(state, {isAuth, address}) {
            state.isAuth = isAuth;
            state.address = address;
        }
    },
    actions: {
        async getStore({commit}) {
            commit("setAuth", {isAuth: localStorage.getItem('isAuth') === 'true',
                address: localStorage.getItem('address')
            })
        },
        async setStore({dispatch}, {isAuth, address}) {
            localStorage.setItem('isAuth', isAuth);
            localStorage.setItem('address', address);
            dispatch("getStore")
        },
        async login({dispatch}) {
            const accounts = await window.ethereum.request({"method": "eth_requestAccounts"});
            if (accounts.length >= 1) {
                const account = accounts[0];
                dispatch('setStore', {isAuth: true, address: account})
            } else {
                console.log('error login')
            }
        },
        async logout({dispatch}) {
            dispatch("setStore", {isAuth: false, address: ''})
        }
        
    }
}