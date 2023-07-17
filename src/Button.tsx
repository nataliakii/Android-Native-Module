import React from 'react';
import {Button} from 'react-native';
import {Calendar} from './NativeModules';

const NewModuleButton = ({fetchCalendarEvents}) => {
  const onPress = () => {
    Calendar.createCalendarEvent('natalia', 'israel', '2023-07-15');
    fetchCalendarEvents();
  };

  return (
    <Button
      title="Click to invoke your native module!"
      color="#841584"
      onPress={onPress}
    />
  );
};

export default NewModuleButton;
