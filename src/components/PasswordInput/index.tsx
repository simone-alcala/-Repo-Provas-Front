import React, { useState , ChangeEvent, FocusEvent } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, SxProps, Theme } from '@mui/material';

interface Props {
  name: string;
  label: string;
  value: string;
  sx: SxProps<Theme>;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

function InputPassword(props: Props) {
  const { name, label, value, sx, onChange } = props;
  const [showPassword, setShowPassword] = useState(false);

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }
  
  return (
    <FormControl sx={ sx } variant='outlined'>
      <InputLabel htmlFor={ name }>{ label }</InputLabel>
      <OutlinedInput 
        id={ name }
        type={ showPassword ? 'text' : 'password' }
        value={ value }
        name={ name }
        label={ label }
        onChange={ onChange }
        required={ true }
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              onClick={ handleClickShowPassword }
              onMouseDown={ handleClickShowPassword }
              edge='end'
            >
              { showPassword ? <VisibilityOff /> : <Visibility /> }
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

export default InputPassword;

