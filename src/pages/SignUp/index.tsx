import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Link, TextField, Typography } from '@mui/material';
import { signUp } from '../../services/api/AuthApi';
import PasswordInput from '../../components/PasswordInput';
import Message, { MessageProps } from '../../components/Message';

type FormDataType = {
  email: string,
  password: string,
  confirmPassword: string,
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
    fontSize: '16px',
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

function SignUp() {

  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [message, setMessage] = useState<MessageType>({ severity: 'success', text: ''});
  const [formData, setFormData] = useState<FormDataType>({ email: '', password: '', confirmPassword: '' });

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  async function handleSubmit(event: FormEvent) {
    setDisableButton(true);
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage({ 
        ...message, 
        severity: 'error', 
        text: 'Senha e confirmação de senha não podem ser diferentes' 
      });
      setShowMessage(true);
      setDisableButton(false);
      return;
    }

    await sendInfo();
    
  } 

  async function sendInfo() {
    const { email, password } = formData;

    try {
      await signUp({ email, password });
      setMessage({ 
        ...message, 
        severity: 'success', 
        text: 'Cadastro realizado com sucesso. Redirecionando para login...' 
      });
      setShowMessage(true);
      setTimeout(() => { navigate('/sign-in', { replace: true }) }, 3000);
    } catch (err: any) {
      console.log(err);
      setMessage({ 
        ...message, 
        severity: 'error', 
        text: `Não foi possível realizar o cadastro. \nMotivo: ${err.response.data || err.message}` 
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
            Cadastro
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
          
          <PasswordInput
            name='confirmPassword' 
            label='Confirme a senha *' 
            sx={ styles.input } 
            value={ formData.confirmPassword } 
            onChange={ handleInputChange }
          />

          <Box sx={ styles.actionsContainer }>

            <Link component={ RouterLink } to='/sign-in'> 
              <Typography> Já possuo cadastro </Typography>  
            </Link>
            
            <Button variant='contained' type='submit' disabled={ disableButton }>  
              CADASTRAR
            </Button>     

          </Box>
        
        </Box>
      </Box>
    </>
  );
}

export default SignUp;