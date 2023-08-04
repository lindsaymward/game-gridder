import { Box } from "@mui/material";
import { CreateTournamentContext } from "../../providers/CreateTournamentProvider";
import { useContext, useEffect, useState } from "react";
import Bracket from "../Tournament/Bracket";
import axios from "axios";

const TournamentView = () => {
  // ------------------- State & Context -------------------
  const [rounds, setRounds] = useState([]);
  const {
    tourMatches, setTourMatches,
    tourParticipants, 
    usersIds, 
    tourPlayerNum, 
  } = useContext(CreateTournamentContext);

  const updateMatches = async () => {
    const matchesArray = [];
  
    for (let index = 0; index < tourParticipants.length; index += 2) {
      const currentName = tourParticipants[index];
      const userPlayer1 = currentName.startsWith('@') ? currentName.slice(1) : currentName;
      const userPlayer2 = tourParticipants[index + 1]?.startsWith('@') ? tourParticipants[index + 1]?.slice(1) : tourParticipants[index + 1];
      const id1 = usersIds[userPlayer1];
      const id2 = usersIds[userPlayer2];
  
      const player1 = { player_name: userPlayer1, user_id: id1 };
      const player2 = { player_name: userPlayer2, user_id: id2 };
      
      // Fetch profile images for players
      if (id1) {
        try {
          const response1 = await axios.get(`/users/${id1}`);
          player1.profile_img = response1.data.profile_img;
        } catch (error) {
          console.error(`Error fetching profile image for user ${id1}:`, error);
          player1.profile_img = null;
        }
      }
      
      if (id2) {
        try {
          const response2 = await axios.get(`/users/${id2}`);
          player2.profile_img = response2.data.profile_img;
        } catch (error) {
          console.error(`Error fetching profile image for user ${id2}:`, error);
          player2.profile_img = null;
        }
      }
  
      const pushUserPlayers = { players: [player1, player2] };
      matchesArray.push(pushUserPlayers);
    }
    setTourMatches(matchesArray);
  };
  

  const updateRounds = (participantCount) => {
    const roundsNumber = Math.ceil(Math.log2(participantCount));
    const roundNames = Array.from({ length: roundsNumber }, (_, index) => {

      return `Round ${index + 1}`;
    });

    setRounds(roundNames);
  };

  useEffect(() => {
    updateMatches();
    updateRounds(tourParticipants.length);
  }, [tourParticipants]);

  return (
      <Box sx={{
        minWidth: '100%',
        height: '80vh',
        overflow: 'auto',
      }}>

        <Bracket numOfPlayers={tourPlayerNum} matchesObj={tourMatches} />
      </Box>

  );
};

export default TournamentView;