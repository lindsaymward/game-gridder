import { Avatar, Box, Container, Typography } from "@mui/material";
import DataTable from "./DataTable";
import podium from '../images/podium.jpg';
import { useEffect, useState } from "react";
import axios from "axios";

const HallOfFame = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/users/top')
      .then(response => {
        setData(response.data);
      })
  }, []);

  return (
    <Box
      width='100%'
      display='flex'
      flexDirection='column'
      alignItems='center'
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          width: '600px',
          marginTop: '15rem',
          marginBottom: '10rem',
          zIndex: 1,
          
        }}>
        <img src={podium} alt="Podium" style={{ width: '800px', borderRadius: '10px' }} />
        <Avatar
          src={data[0]?.profile_img}
          alt="1st"
          sx={{
            position: 'absolute',
            top: '42%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '130px',
            height: '130px',
            zIndex: 1,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            filter: 'saturate(150%) contrast(120%)',
          }}
        />

        <Avatar
          src={data[1]?.profile_img}
          alt="2nd"
          sx={{
            position: 'absolute',
            top: '48%',
            left: '13.5%',
            transform: 'translate(-50%, -50%)',
            width: '130px',
            height: '130px',
            zIndex: 1,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            filter: 'saturate(150%) contrast(120%)',
          }}
        />
        <Avatar
          src={data[2]?.profile_img}
          alt="3rd"
          sx={{
            position: 'absolute',
            top: '54%',
            left: '86.6%',
            transform: 'translate(-50%, -50%)',
            width: '130px',
            height: '130px',
            zIndex: 1,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            filter: 'saturate(150%) contrast(120%)',
          }}
        />
        <Typography variant='h5' sx={{
          display: 'flex', justifyContent: 'space-between', position: 'absolute', top: '92%', left: '13.5%',
          transform: 'translate(-50%, -50%)', zIndex: 2,
          fontWeight: 'bold'
        }}>{data[1]?.user_name}</Typography>
        <Typography variant='h5' sx={{
          display: 'flex', justifyContent: 'space-between', position: 'absolute', top: '92%', left: '50%',
          transform: 'translate(-50%, -50%)', zIndex: 2, fontWeight: 'bold'
        }}>{data[0]?.user_name}</Typography>
        <Typography variant='h5' sx={{
          display: 'flex', justifyContent: 'space-between', position: 'absolute', top: '92%', left: '86.6%',
          transform: 'translate(-50%, -50%)', zIndex: 2, fontWeight: 'bold'
        }}>{data[2]?.user_name}</Typography>

      </Container>


      <Typography variant="h2" color='secondary.main' sx={{ mb: '1rem', marginTop: '3rem' }}>Top 10 Players by Wins</Typography>
      <DataTable
        data={data}
      />
      <div style={{ marginBottom: '150px' }}>

      </div>
    </Box>
  );
}

export default HallOfFame;