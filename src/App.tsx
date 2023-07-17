import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import NewModuleButton from './Button';
import {Calendar, Birthday} from './NativeModules';
import Table from './Table';
import DaysLeft from './DaysLeft';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [calendarEvents, setCalendarEvents] = useState([]);
  const [daysLeft, setDaysLeft] = useState([]);

  useEffect(() => {
    fetchCalendarEvents();
    fetchTillBirthdayDays();
  }, []);

  const fetchCalendarEvents = () => {
    Calendar.getCalendarEventsForWeek()
      .then(events => {
        setCalendarEvents(events);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const fetchTillBirthdayDays = () => {
    Birthday.getDaysUntilBirthday()
      .then(daysLeft => {
        setDaysLeft(daysLeft);
        console.log('Days left until birthday:', daysLeft);
      })
      .catch(error => {
        console.error('Failed to retrieve days until birthday:', error);
      });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <NewModuleButton fetchCalendarEvents={fetchCalendarEvents} />
          <DaysLeft daysLeft={daysLeft} />
          <Table events={calendarEvents} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
