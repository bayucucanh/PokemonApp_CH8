import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import database from '@react-native-firebase/database';

const PokebagCard = props => {

  return (
    <TouchableOpacity style={styles.wrapper} onPress={props.onPress}>
      <Image
        source={{uri: props.pokemonData.pokemonImg}}
        style={{width: 100, height: 100}}
      />
      <Text style={styles.name}>{props.pokemonData.name}</Text>
    </TouchableOpacity>
  );
};

export default PokebagCard;

const styles = StyleSheet.create({
  wrapper: {
    width: 170,
    height: 150,
    backgroundColor: '#b0e46a',
    marginBottom: 15,
    borderRadius: 15,
    padding: 15,
    position: 'relative',
    alignItems: 'center',
  },
  name: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
});
