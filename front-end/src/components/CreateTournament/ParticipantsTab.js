import { useContext, useEffect, useState } from "react";
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Box, styled, Paper, Typography, Card, IconButton, Divider, Container, Autocomplete } from "@mui/material";
import { CreateTournamentContext } from "../../providers/CreateTournamentProvider";
import axios from "axios";
import ClearIcon from '@mui/icons-material/Clear';
import UserSearchField from './UserSearchField';

const ParticipantsTab = (props) => {
  const [participantName, setParticipantName] = useState('');
  const [participantsList, setParticipantList] = useState('');
  const [participantsNumber, setParticipantsNumber] = useState(4);
  const {
    tourName, setTourName,
    tourGameName, setTourGameName,
    tourDescription, setTourDescription,
    tourParticipants, setTourParticipants,
    tourMatches, setTourMatches,
  } = useContext(CreateTournamentContext);

  const spacingItems = 2;
  const numberOfParticipantsOptions = [4,8,16,32]

  const addTourParticipant = (playerName) => {
    const trimmedPlayerName = playerName.trim();
    if (trimmedPlayerName !== '') {
      // Add new participant to the tourParticipants array
      setTourParticipants([...tourParticipants, playerName]);
      setParticipantName('');
    }
  };

  useEffect(() => {
    setParticipantList(tourParticipants.join('\n'));
    // This to make sure the number of participants (in the dropdown) is always greater than the number of participants in the tournament 
    // while being among the options 4, 8, 16, 32
    if (tourParticipants.length > participantsNumber) {
      for (let i = 0; i < numberOfParticipantsOptions.length; i++) {
        if (tourParticipants.length > numberOfParticipantsOptions[i]) {
          setParticipantsNumber(numberOfParticipantsOptions[i + 1]);
        }
      }
    }
  }, [tourParticipants]);

  const handleButtonGenerate = () => {

    const requestBody = {
      "organizer_id": 1,
      "category_id": 1,
      "name": tourName,
      "start_date": "2023-07-15T06:00:00.000Z",
      "status": "created",
      "game_name": "Poker",
      "description": tourDescription,
      "private": false,
      "matches": tourMatches
    };

    axios.post('/tournaments/create', requestBody)
      .then(response => {
        // console.log(response.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };
  const handleIconDelete = (index) => {
    const updatedParticipants = [...tourParticipants];
    updatedParticipants.splice(index, 1);
    setTourParticipants(updatedParticipants);
  };

  const handleNewParticipantOnChange = (event) => {
    const value = event.target.value;
    setParticipantName(value);

  };

  return (
    <Box sx={{
      marginLeft: 2,
      marginRight: 2,
      marginTop: 12,
      textAlign: 'center',

    }}
    >
      <FormControl fullWidth sx={{ marginBottom: spacingItems }}>
        <InputLabel id="type-select-label">Number of Partcipants</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={participantsNumber}
          label="Number of Participants"
          onChange={(event) => { setParticipantsNumber(event.target.value) }}
        >
          <MenuItem value={'4'}>4</MenuItem>
          <MenuItem value={'8'}>8</MenuItem>
          <MenuItem value={'16'}>16</MenuItem>
          <MenuItem value={'32'}>32</MenuItem>

        </Select>
      </FormControl>

      <UserSearchField
        addTourParticipant={addTourParticipant}
      ></UserSearchField>



      <Box sx={{
        padding: '15px', border: '1px solid black', borderRadius: 2, marginBottom: spacingItems,
        height: `${participantsNumber* 45+ 80}px`,
        maxHeight: '60vh',
        overflow: 'auto'
      }}>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>Participants</Typography>
        <Divider></Divider>
        {tourParticipants.map((participant, index) => {
          return <Card
            variant="outlined"
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 1, bgcolor: "#8D99AE" }}
            key={index}
          >
            <Typography variant="h6"
              sx={{ marginLeft: 1 }}
            > {index + 1} </Typography>

            <Typography variant="h7"> {participant} </Typography>
            <IconButton sx={{ color: '#BB0C05' }} onClick={() => handleIconDelete(index)}>
              < ClearIcon fontSize="small" sx={{ color: '#BB0C05' }} />
            </IconButton>
          </Card>
        })}


        
      </Box>

      {/* <Button
        variant="contained"
        sx={{
          width: '100%',
          bgcolor: '#BB0C05',
          marginBottom: spacingItems
        }}
        onClick={props.handleButtonNext}
      >Next</Button> */}

      <Button
        variant="contained"
        sx={{
          width: '100%',
          bgcolor: '#BB0C05'
        }}
        onClick={handleButtonGenerate}
      >Create Tournament</Button>
    </Box>
  );
};

export default ParticipantsTab;
