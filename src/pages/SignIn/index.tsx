import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Link, TextField, Typography } from '@mui/material';
import { signIn } from '../../services/api/AuthApi';
import PasswordInput from '../../components/PasswordInput';
import Message, { MessageProps } from '../../components/Message';
import { useAuth } from '../../contexts/AuthProvider';

type FormDataType = {
  email: string,
  password: string,
}

type MessageType = Omit<MessageProps, 'onclose'>;

const styles = {
  container: {
    maxWidth: '460px',
    minWidth: '300px',
    height: '100vh',
    marginInline: 'auto',
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
  }, 
  formData: {
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'space-between', 
    alignItems: 'center',
    width: '100%',
    fontSize: '24px',
    fontWeight: 500,
  }, 
  title: {
    margin: 1
  },
  input: { 
    margin: 1, 
    width: '100%' , 
    backgroundColor: 'white',
    fontSize: '16px'
  },
  actionsContainer: {
    width: '100%',
    display: 'flex', 
    alignItems: 'center',
    justifyContent:'space-between',
    margin: 2
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '1px',
    margin: 4,
  },
  buttonGitHub: {
    width: '100%',
    backgroundColor: '#424445',
    margin: 1,
  }
}

function SignIn() {

  const { login } = useAuth();
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [message, setMessage] = useState<MessageType>({ severity: 'success', text: ''});
  const [formData, setFormData] = useState<FormDataType>({ email: '', password: '' });

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  async function handleSubmit(event: FormEvent) {
    setDisableButton(true);
    event.preventDefault();
    await sendInfo();    
  } 

  async function sendInfo() {
    const { email, password } = formData;
    try {
      const result = await signIn({ email, password });
      setMessage({ 
        ...message, 
        severity: 'success', 
        text: 'Login realizado realizado com sucesso. Redirecionando para página inicial...' 
      });
      setShowMessage(true);
      setTimeout(() => { 
        navigate('/home', { replace: true });
        login(result.data.token);
      }, 3000);
    } catch (err: any) {
      console.log(err);
      setMessage({ 
        ...message, 
        severity: 'error', 
        text: `Não foi possível acessar o sistema. \nMotivo: ${err.response.data || err.message}` 
      });
      setShowMessage(true);
      setDisableButton(false);
    }
  }

  return ( 
    <>
      <Box sx={ styles.container } component='form' onSubmit={handleSubmit}>

        {showMessage && 
          <Message 
            text={message.text} 
            severity={message.severity} 
            onclose={() => { setShowMessage(!showMessage) }} 
          />
        }   
        
        <Box sx={ styles.formData }>

          <Typography variant='h4' component='h1' sx={ styles.title }>
            Login
          </Typography>

          <Button variant='contained' type='button' sx={ styles.buttonGitHub }>  
              ENTRAR COM GITHUB
          </Button>   

          <Divider sx={ styles.divider } variant='middle'> 
            <Typography  component='span'> ou </Typography>
          </Divider>

          <TextField name='email'
            label='Email' 
            type='email'
            sx={ styles.input } 
            variant='outlined' 
            value={ formData.email } 
            onChange={ handleInputChange }
            required={true}
          />

          <PasswordInput name='password' 
            label='Senha *' 
            sx={ styles.input } 
            value={ formData.password } 
            onChange={ handleInputChange }
          />
  
          <Box sx={ styles.actionsContainer }>

            <Link component={ RouterLink } to='/sign-up'> 
              <Typography> Já possuo cadastro </Typography>  
            </Link>
            
            <Button variant='contained' type='submit' disabled={ disableButton }>  
              Entrar
            </Button>     

          </Box>
        
        </Box>
      </Box>
    </>
  );
}

export default SignIn;