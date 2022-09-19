import React from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TbChecklist } from 'react-icons/tb';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthProvider';

const styles = {
  container: {
    maxWidth: '800px',
    minWidth: '300px',
    height: '100px',
    marginInline: 'auto',
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
  }, 
  logout: {
    fontSize: '60px',
    color: '#000',
    cursor: 'pointer',
  },
  logo: {
    fontSize: '70px',
    color: '#3F61D7',
    display: 'flex', 
    justifyContent: 'left', 
    alignItems: 'center', 
  },
  repo: {
    fontWeight: 700,
    fontSize: '36px',
    color: '#000',
  },
  provas: {
    fontWeight: 700,
    fontSize: '36px',
    color: '#3F61D7',
  },
  buttons: {
    maxWidth: '800px',
    minWidth: '300px',
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginInline: 'auto',
  },
  button: {
    margin: 2
  },
  divider: {
    margin: 2
  }
}

function Header() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleClickLogOut(){
    logout();
    navigate('/sign-in');
  }

  return (
    <Box>
      <Box sx={ styles.container } component='header' >
        <Box sx={ styles.logo } >
          <TbChecklist /> 
          <Typography sx={ styles.repo }>Repo</Typography>
          <Typography sx={ styles.provas }>Provas</Typography>
        </Box>
        <Box sx={ styles.logout } onClick={handleClickLogOut} >
          <FiLogOut />
        </Box>
      </Box>
      <Divider sx={ styles.divider }/>
      <Box sx={ styles.buttons }>
        <Button variant='outlined' sx={ styles.button }> DISCIPLINAS </Button>
        <Button variant='outlined' sx={ styles.button }> INSTRUTOR(A) </Button>
        <Button variant='outlined' sx={ styles.button }> ADICIONAR </Button>
      </Box>
    </Box>
  )
}

export default Header;