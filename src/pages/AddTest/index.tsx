import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { getCategories } from '../../services/api/CategoryApi';
import { getTeachers } from '../../services/api/TeacherApi';
import { getDisciplines } from '../../services/api/DisciplineApi';
import { addTest } from '../../services/api/TestApi';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Select, 
  SelectChangeEvent, 
  InputLabel, 
  MenuItem,
  FormControl } 
from '@mui/material';

import Header from '../../components/Header';
import Message, { MessageProps } from '../../components/Message';

import { useAuth } from '../../contexts/AuthProvider';

const styles = {
  container: {
    maxWidth: '800px',
    minWidth: '300px',
    height: '100px',
    marginInline: 'auto',
    display: 'flex', 
    flexDirection: 'column',
    padding: '10px',
  }, 
  input: { 
    margin: 1,
    width: '100%' , 
    backgroundColor: 'white',
    fontSize: '16px',  
    paddingRight: '12px'  
  },
  title: {
    margin: 1
  },
  button: {
    margin: 1
  }
}

type FormDataType = {
  name: string,
  pdfUrl: string, 
  categoryId: number,
  teacherId: number,
  disciplineId: number,
}

type SelectDataType = {
  id?: number,
  name?: string,
}

type MessageType = Omit<MessageProps, 'onclose'>;

function AddTest() {

  const { getToken } = useAuth();
  const [showMessage, setShowMessage] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [message, setMessage] = useState<MessageType>({ severity: 'success', text: ''});
  const [formData, setFormData] = useState<FormDataType>({ 
    name: '',
    pdfUrl: '', 
    categoryId: 0,
    teacherId: 0,
    disciplineId: 0,
  });
  const [category, setCategory] = useState<SelectDataType[]>([]);
  const [teacher, setTeacher] = useState<SelectDataType[]>([]);
  const [discipline, setDiscipline] = useState<SelectDataType[]>([]);

  function handleSelectChange(event: SelectChangeEvent) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event: FormEvent) {
    setDisableButton(true);
    event.preventDefault();
    await sendInfo();    
  } 

  async function sendInfo() {
    const { name, pdfUrl, teacherId, disciplineId, categoryId } = formData;
    
    try {

      const token = getToken() || '';

      await addTest(token, { name, pdfUrl, teacherId, disciplineId, categoryId } );
      setMessage({ 
        ...message, 
        severity: 'success', 
        text: 'Teste cadastrado com sucesso.' 
      });
      setShowMessage(true);
      
      setTimeout(() => {
        setShowMessage(false);
        setDisableButton(false);
        setFormData({
          ...formData,
          name: '',
          pdfUrl: '', 
          categoryId: 0,
          teacherId: 0,
          disciplineId: 0
        });
      }, 2000);
    } catch (err: any) {
      console.log(err);
      setMessage({ 
        ...message, 
        severity: 'error', 
        text: `Não foi possível cadastrar o teste. \nMotivo: ${err.response.data || err.message}` 
      });
      setShowMessage(true);
      setDisableButton(false);
    }
  }

  useEffect(() => {

      const token = getToken();

      if (token) {
        const categories = getCategories(token);
        categories.then((response) => setCategory([ ...response.data ]));
  
        const teachers = getTeachers(token);
        teachers.then((response) => setTeacher([ ...response.data ]));
      
        const disciplines = getDisciplines(token);
        disciplines.then((response) => setDiscipline([ ...response.data ]));
        
      }

  },[]);
  
  return(
    <>

    <Header />

    {showMessage && 
      <Message 
        text={message.text} 
        severity={message.severity} 
        onclose={() => { setShowMessage(!showMessage) }} 
      />
    }   

    <Box sx={ styles.container } component='form' onSubmit={handleSubmit}>

      <Typography variant='h4' component='h1' sx={ styles.title }>
        Adicione uma prova
      </Typography>

      <TextField name='name'
        label='Nome da prova' 
        sx={ styles.input } 
        variant='outlined' 
        value={ formData.name } 
        onChange={ handleInputChange }
        required={true}
      />

      <TextField name='pdfUrl'
        label='Link da prova' 
        type='url'
        sx={ styles.input } 
        variant='outlined' 
        value={ formData.pdfUrl } 
        onChange={ handleInputChange }
        required={true}
      />

      <FormControl required sx={ styles.input } variant='outlined' >
        <InputLabel id='category' >Categoria</InputLabel>
        <Select name='categoryId' labelId='category' value={formData.categoryId.toString()} onChange={handleSelectChange}>
          {category?.map( (cat, index) => <MenuItem key={index} value={cat.id}>{cat.name}</MenuItem> )}
        </Select>
      </FormControl>

      <FormControl required sx={ styles.input } variant='outlined' >
        <InputLabel id='discipline' >Disciplina</InputLabel>
        <Select name='disciplineId' labelId='discipline' value={formData.disciplineId.toString()} onChange={handleSelectChange}>
          {discipline?.map( (dis, index) => <MenuItem key={index} value={dis.id}>{dis.name}</MenuItem> )}
        </Select>
      </FormControl>

      <FormControl required sx={ styles.input } variant='outlined' >
        <InputLabel id='teacher' >Instrutor(a)</InputLabel>
        <Select name='teacherId' labelId='teacher' value={formData.teacherId.toString()} onChange={ handleSelectChange }>
          {teacher?.map( (tea, index) => <MenuItem key={index} value={tea.id}>{tea.name}</MenuItem> )}
        </Select>
      </FormControl>

      <Button variant='contained' type='submit' sx={ styles.button } disabled={ disableButton }>  
        enviar
      </Button>     

    </Box>

    </>
  );
}

export default AddTest;