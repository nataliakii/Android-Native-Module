import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Table = ({events}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calendar Events</Text>
      <View style={styles.table}>
        {events.map((event, index) => (
          <View style={styles.row} key={index}>
            <Text style={styles.cell}>{event.title}</Text>
            <Text style={styles.cell}>{event.location}</Text>
            <Text style={styles.cell}>{event.startDate}</Text>
            <Text style={styles.cell}>{event.endDate}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  table: {
    backgroundColor: '#040000',
    borderRadius: 8,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  cell: {
    flex: 1,
    padding: 5,
  },
});

export default Table;
