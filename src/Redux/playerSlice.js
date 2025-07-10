import { createSlice,nanoid } from '@reduxjs/toolkit'
import { act } from 'react'

const initialState={
    allPlayers:[],
    team:[],
    teamData:{
        batsman:0,
        bowler:0,
        allRounder:0
    },
    playerCount:0,
    sortInfo:{t1:'id',t2:'id'}

}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers:{
        addPlayer:(state,action)=>{
            const obj={
                id: action.payload.id,
                name:action.payload.name,
                skill:action.payload.skill
            }
            // state.teamData[obj.skill]+=1
            let arr =[...state.allPlayers]
            arr.push(obj)
            switch(state.sortInfo.t1){
                case 'id':
                    // console.log("inside initial id sort")
                    arr.sort((a,b)=>a.id-b.id)
                    break;
                case 'name':
                    // console.log("inside initial name sort")
                    arr.sort((a,b)=>a.name.localeCompare(b.name))
                    break;
            }
            state.allPlayers=arr
            state.playerCount+=1
        },
        shiftToTeam:(state,action)=>{
            const player = action.payload
            state.allPlayers=state.allPlayers.filter((d)=>d.id!==player.id) 
            state.teamData[player.skill]+=1
            state.team=[...state.team,player]

            let arr =[...state.team]
            switch(state.sortInfo.t2){
                case 'id':
                    arr.sort((a,b)=>a.id-b.id)
                    break;
                case 'name':
                    arr.sort((a,b)=>a.name.localeCompare(b.name))
                    break;
            }
            state.team=arr

        
        },
        shiftToAll:(state,action)=>{
            const player = action.payload
            // console.log('player',player )
            state.team=state.team.filter((d)=>d.id!==action.payload.id)
            state.teamData[player.skill]-=1
            state.allPlayers=[...state.allPlayers,player]

            let arr =[...state.allPlayers]
            switch(state.sortInfo.t1){
                case 'id':
                    arr.sort((a,b)=>a.id-b.id)
                    break;
                case 'name':
                    arr.sort((a,b)=>a.name.localeCompare(b.name))
                    break;
            }
            state.allPlayers=arr
        },
        sort:(state,action)=>{
            const obj = {...state.sortInfo,...action.payload}
            state.sortInfo=obj
            let arr =[...state.allPlayers]
            switch(obj.t1){
                case 'id':
                    // console.log("inside t1 slice id sort")
                    arr.sort((a,b)=>a.id-b.id)
                    // console.log("arr:",arr)
                    break;
                case 'name':
                    arr.sort((a,b)=>a.name.localeCompare(b.name))
                    break;
            }
            state.allPlayers=arr

            arr =[...state.team]
            switch(obj.t2){
                case 'id':
                    arr.sort((a,b)=>a.id-b.id)
                    break;
                case 'name':
                    arr.sort((a,b)=>a.name.localeCompare(b.name))
                    break;
            }
            state.team=arr

        }
       
        
    }
})

export const{addPlayer,shiftToTeam,shiftToAll,sort} = counterSlice.actions

export default counterSlice.reducer