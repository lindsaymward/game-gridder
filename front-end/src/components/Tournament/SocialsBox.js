import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import ShareButtonsTournament from '../Tournaments/ShareButtonsTournament';

import { useState } from 'react'

const SocialsBox = ({ tournament }) => {
  const [anchorElTournament, setAnchorElTournament] = useState(null);

  const handleOpenTournamentMenu = (event) => {
    setAnchorElTournament(event.currentTarget);
  };

  const handleCloseTournamentMenu = () => {
    setAnchorElTournament(null);
  };
  
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "space-between", height: "100%", color: "primary.contrastText"}}>
        <>
          <Button
            onClick={handleOpenTournamentMenu}
            sx={{ my: 1, color: 'white', display: "flex", alignItems: "end"}}
          >
             <KeyboardArrowDownRoundedIcon sx={{color: "#FFF"}}/>
          </Button>
          <Menu
            anchorEl={anchorElTournament}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElTournament)}
            onClose={handleCloseTournamentMenu}
            sx={{
              display: { xs: 'none', md: 'block'},
            }}>
            <div style={{display:"flex"}}>
              <ShareButtonsTournament tournament={tournament}/>
            </div>
          </Menu>
        </>
    </Box>
  )
};

export default SocialsBox;