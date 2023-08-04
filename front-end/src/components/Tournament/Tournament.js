import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Bracket from './Bracket';
import EditBracket from './EditBracket';
import { Box } from "@mui/material";
import SocialsBox from './SocialsBox';
import { AuthContext } from '../../providers/AuthProvider';
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import "./../../sass/tournament.scss"

const Tournament = () => {
  const [tournament, setTournament] = useState(null);
  const [tournamentDate, setTournamentDate] = useState("");
  const [tournamentTime, setTournamentTime] = useState("")
  const [numOfPlayers, setNumOfPlayers] = useState(0);
  const [organizerLoggedIn, setOrganizerLoggedIn] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const { userId } = useContext(AuthContext)

  let tournamentID = useParams();

  // Need proper cleanup to work in this file, otherwise app crashes from too many requests
  useEffect(() => {
    setData()
  }, [numOfPlayers])


  const setData = async() => {
    const tempData = await axios.get(`/tournaments/${tournamentID.id}`)

        setTournament(tempData.data)
        if(tempData.data.matches.length === 0) setNumOfPlayers([].length)
        const getPlayerNums = tempData.data.matches.reduce((ac, cv) => {
          if(cv.players.length === 0) return ac
          if(!ac.includes(cv?.players[0]?.player_name) && cv?.players[0]?.player_name !== 'TBD') ac.push(cv?.players[0]?.player_name)
          if(!ac.includes(cv?.players[1]?.player_name) && cv?.players[1]?.player_name !== 'TBD') ac.push(cv?.players[1]?.player_name)
          return ac
        }, [])
        setNumOfPlayers(getPlayerNums.length);
        
        setTournamentDate(`${new Date(tempData.data.start_date).toString().slice(0, 16)}`)
        setTournamentTime(`${new Date(tempData.data.start_date).toString().slice(16, 28)}`)

        if(userId) checkIfUserIsOrganizer()
  }

  const checkIfUserIsOrganizer = async() => {
    const organizerId = tournament?.organizer_id
    if(organizerId === userId) setOrganizerLoggedIn(true)
  }

  const handleClick = () => {
    setEditMode(prev => !prev)
  }

  if (tournament !== null) {
  return (
    <div key={tournament.id}>
      <div id="tournament-data">
        <h1 className="title">{tournament.name}</h1>
        <div className="tournament-stats">
          <div className="tournament-info">
            <Typography variant="body2" color="text.secondary" sx={{display: "flex", alignItems: "center", color: "#FFF"}}>
              <PersonIcon sx={{mr: 1.5}}/> 
              <span>{numOfPlayers}</span>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{display: "flex", alignItems: "center", color: "#FFF"}}>
              <EmojiEventsIcon sx={{ mx: 1.5 }} />
              <span>Single Elimination</span>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{display: "flex", alignItems: "center", color: "#FFF"}}>
              <VideogameAssetIcon sx={{mx: 1.5}}/>
              <span>{tournament.game_name}</span>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{display: "flex", alignItems: "center", color: "#FFF", marginRight:"1rem"}}>
              <CalendarMonthIcon sx={{mx: 1.5}}/> 
              <span>{tournamentDate}</span>
            </Typography>
            <AddToCalendarButton
              name={tournament.name}
              label=""
              description={tournament.description}
              options={['Apple','Google']}
              hideTextLabelButton
              startDate={tournament.start_date.slice(0, 10)}
              timeZone="America/Los_Angeles"
              buttonStyle="round"
              styleLight="--btn-background: #BB0C05; --btn-text: #fff;"
              size="4"          
            ></AddToCalendarButton>
            <Box className="filter-box" sx={{ display: { xs: 'none', md: 'flex' }, padding: "0", margin: "0", }}>
              <SocialsBox tournament={tournament}/>
            </Box>
          </div>
          <div>
            {organizerLoggedIn && 
              <Fab onClick={handleClick} size="small" color="secondary" aria-label="edit">
                <EditIcon />
              </Fab>}
          </div>
        </div>
      </div>

      {editMode ? 
        <EditBracket numOfPlayers={numOfPlayers} tournament={tournament} setTournament={setTournament}/> 
        : 
        <Bracket numOfPlayers={numOfPlayers} tournament={tournament} organizerLoggedIn={organizerLoggedIn}/>
      }    
      
    </div>
  )
}
}

export default Tournament;