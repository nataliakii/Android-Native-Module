import React from 'react';
import { Text, View } from 'react-native';

interface DaysLeftProps {
  daysLeft: number;
}

const DaysLeft: React.FC<DaysLeftProps> = ({ daysLeft }) => {
  return (
    <View>
      <Text>Days Left Until Birthday: {daysLeft}</Text>
    </View>
  );
};

export default DaysLeft;
