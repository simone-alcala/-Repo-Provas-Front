import React, { SyntheticEvent } from 'react';
import { Alert } from '@mui/material';

export type MessageProps = {
  text: string,
  severity: 'success' | 'error',
  onclose: (event: SyntheticEvent<Element, Event>) => void,
}

function Message (props: MessageProps) {
  const { text, severity, onclose } = props;

  return ( 
    <Alert severity={severity} onClose={onclose} >
      {text}
    </Alert> 
  );
}

export default Message;