import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { addPlayer,shiftToTeam,shiftToAll,sort} from './Redux/playerSlice'
import { nanoid } from '@reduxjs/toolkit'


function App() {
  const[data,setData]=useState({name:'',skill:'batsman'})
  const[curAllPLayer,setCurAllPLayer] = useState()
  const[curTeamPLayer,setCurTeamPLayer] = useState()

  const dispatch = useDispatch()
  const allPlayers =[...useSelector((state)=>state.allPlayers)] 
  // let all = [...allPlayers]
  const team = useSelector((state)=>state.team)
  // let tm = [...team]
  const teamData = useSelector((state)=>state.teamData)
  const playerId = useSelector((state)=>state.playerCount)
  const [sortinfo,setSortinfo]=useState({t1:"",t2:""})

   

  useEffect(()=>{
    // console.log("inside useEffect")
    const preData = sessionStorage.getItem('userData')
    //console.log('PRE',JSON.parse(preData))
    if(preData){
      setData(JSON.parse(preData))
    }
  },[])

  // useEffect(()=>{
    
  //   switch(sortinfo.t1){
  //     case 'id':
  //       console.log("inside t1 id sort")
  //       all.sort((a,b)=>a.id-b.id)
  //       break;
  //     case 'name':
  //       console.log("inside t1 name sort")
  //       all.sort((a,b)=>a.name.localeCompare(b.name))
  //       console.log("all after sort",all)
  //     default:
  //       all=[...allPlayers]
  //   }

  //   switch(sortinfo.t2){
  //     case 'id':
  //       tm.sort((a,b)=>a.id-b.id)
  //       break;
  //     case 'name':
  //       tm.sort((a,b)=>a.name.localeCompare(b.name))
  //     default:
  //       tm=[...team]
  //   }
  // },[allPlayers,team,sortinfo])
  
  
  function handleChange(e){
    const field = e.target.name;
    const val = e.target.value
    // console.log('field',field)
    // console.log('value',val)
    const obj={
      ...data,
      [field]:val
    }

    //console.log('obj',obj)
    // setData((prev)=>{
    //   return{
    //     ...prev,
    //     [field]:val
    //   }
    // })

    setData(obj)
    sessionStorage.setItem('userData',JSON.stringify(obj))
    // console.log("data after set",data)
    
  }

  function handleSort(e){
    if(e.target.name=='table1'){
      dispatch(sort({t1:e.target.value}))
    }else{
      dispatch(sort({t2:e.target.value}))
    }
  }

  function handleSubmit(e){
    e.preventDefault()
    const id = playerId+1
    data.id=id
     //console.log('data',data)
    dispatch(addPlayer(data))
    setData({name:'',skill:'batsman'})
    sessionStorage.setItem('userData','')
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
         
          <div>
            Sort T1:
          <select name='table1' className='sortOptions'  onChange={handleSort} >
            <option value='id' >ID</option>
            <option value='name' >Name</option>
          </select>
        </div>
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
          <div>
            Sort T2
            :
          <select className='sortOptions' onChange={handleSort}>
            <option value='id' >ID</option>
            <option value='name' >Name</option>
          </select>
        </div>
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
