import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { addPlayer,shiftToTeam,shiftToAll} from './Redux/playerSlice'
import { nanoid } from '@reduxjs/toolkit'


function App() {
  const[data,setData]=useState({name:'',skill:'batsman'})
  const[curAllPLayer,setCurAllPLayer] = useState()
  const[curTeamPLayer,setCurTeamPLayer] = useState()

  const dispatch = useDispatch()
  const allPlayers = useSelector((state)=>state.allPlayers)
  const team = useSelector((state)=>state.team)
  const teamData = useSelector((state)=>state.teamData)
  const playerId = useSelector((state)=>state.playerCount)

  useEffect(()=>{
    const preData = sessionStorage.getItem('userData')
    // console.log('PRE',preData)
    if(preData){
      setData(JSON.parse(preData))
    }
  },[])
  
  
  function handleChange(e){
    const field = e.target.name;
    const val = e.target.value
    // console.log('field',field)
    // console.log('value',val)
    setData((prev)=>{
      return{
        ...prev,
        [field]:val
      }
    })
    sessionStorage.setItem('userData',JSON.stringify(data))
    // console.log("data after set",data)
    
  }

  function handleSubmit(e){
    e.preventDefault()
    const id = playerId+1
    data.id=id
     console.log('data',data)
    dispatch(addPlayer(data))
  }

  function isValid(d){
    // console.log("inside isValid d.skill:",d.skill)
    if(team.length===11){
      alert('team is full')
      return false
    }else if(d.skill=='batsman' && teamData.batsman==5){
      alert('team can only have 5 batsman')
      return false
    }else if(d.skill=='bowler' && teamData.bowler==4){
      alert('team can only have 4 bowlers')
      return false
    }else if(d.skill=='allRounder' && teamData.allRounder==2){
      alert('team can only have 2 all rounders')
      return false
    }else{
      return true
    }
  }

  // console.log('allPlayres', allPlayers)
  return (
    <div id='cont'>
      <form id='form' onSubmit={handleSubmit}>

        <input name='name' className='input' placeholder='Enter Player Name' value={data.name}  onChange={handleChange} required />
        <select  className='input'  name='skill' value={data.skill} onChange={handleChange} required >
          <option value='batsman' >batsman</option>
          <option value='bowler' >bowler </option>
          <option value='allRounder' >All rounder</option>
        </select>
        {/* <input name='skill' className='input' placeholder='Enter Skill' value={data.skill} onChange={handleChange} /> */}
        <button id='submit' type='submit' >Add Player</button>

      </form>

      <div id='heading'> 
        <div>
          All Players
        </div>
        {(curAllPLayer?.id || curTeamPLayer?.id)? <div>
          
          Player ID:{(curAllPLayer?.id || curTeamPLayer?.id)} Selected
        </div>:<div>No Player Selected</div>}
       
        <div>
          Team
        </div>
         </div>

      <div id='tables'>

        <div id='all'>
          {allPlayers.map((d,i)=>(
            <div key={nanoid()} onClick={() => {
                setCurAllPLayer(d)
                setCurTeamPLayer(null) // deselect from team
              }}
             > 
            <div id='id'>
              {d.id}
            </div>
            <div>
              {d.name}
            </div>
            <div>
              {d.skill}
            </div>
          </div>)
          )}
          
        </div>

        <div id='buttons'>
          <button disabled={curAllPLayer?false:true} onClick={()=>{
            if(curAllPLayer && curAllPLayer.id && isValid(curAllPLayer)){
              dispatch(shiftToTeam(curAllPLayer))
              setCurAllPLayer(null)
            }
          }}>
            {'>'}
          </button>
          <button disabled={curTeamPLayer?false:true} onClick={()=>{
            if(curTeamPLayer && curTeamPLayer.id){
              dispatch(shiftToAll(curTeamPLayer))
              setCurTeamPLayer(null)
            }
          }}>
            {'<'}
          </button>
        </div>

        <div id='team'>

          {team.map((d,i)=>(
            <div key={nanoid()} onClick={() => {
                setCurAllPLayer(null)
                setCurTeamPLayer(d) // deselect from team
              }}
              > 
            <div id='id'>
              {d.id}
            </div>
            <div>
              {d.name}
            </div>
            <div>
              {d.skill}
            </div>
          </div>)
          )}
        </div>
      </div>
    </div>

  )
}

export default App
