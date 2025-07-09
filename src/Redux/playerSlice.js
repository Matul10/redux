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
    playerCount:0

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
            state.allPlayers.push(obj)
            state.playerCount+=1
        },
        shiftToTeam:(state,action)=>{
            const player = action.payload

           
            state.allPlayers=state.allPlayers.filter((d)=>d.id!==player.id) 
            state.teamData[player.skill]+=1
            state.team=[...state.team,player]
        
        },
        shiftToAll:(state,action)=>{
            const player = action.payload
            // console.log('player',player )
            state.team=state.team.filter((d)=>d.id!==action.payload.id)
            state.teamData[player.skill]-=1
            state.allPlayers=[...state.allPlayers,player]
        },
       
        
    }
})

export const{addPlayer,shiftToTeam,shiftToAll} = counterSlice.actions

export default counterSlice.reducer