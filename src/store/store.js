import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
    state:{
        counter:0,
        allUsers:[]
    },
    mutations:{
        increaseCounter(state){
            state.counter++;
        },
        reduceCounter(state){
            state.  counter--;
        },
        increaseBy(state,value){
            state.counter += value;
        },
        setUsers(state,users){
            state.allUsers = [...state.allUsers, users];
        }
    },
    actions:{
        async delay({commit},value){
            setTimeout(() => {
                commit('increaseBy',value)
            }, 3000);
        },
        getUsers: async({commit})=>{
        try{    
            const response = await axios.get('http://127.0.0.1:8000/api/get-all-users');
            const users = response.data.data;
            commit('setUsers',users);
        }
        catch(error){
            console.log(error)
        }
    }
    }
})

export default store;