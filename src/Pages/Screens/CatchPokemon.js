import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  Animated,
} from 'react-native';
import React, {useState} from 'react';
import {PokeBall, BackgroundCatch} from '../../Assets';

const CatchPokemon = () => {
  const [pokemon, setPokemon] = useState('');
  const [catchInfo, setCatchInfo] = useState('');

  const baseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  const catched = () => {
    const numPokemon = 30;
    const catched = Math.floor(Math.random() * numPokemon);
    const newPokemon = `${baseURL}${catched}.png`;
    if (catched > 20 || catched === 0) {
      setCatchInfo('Gagal Menangkap Pokemon');
      setPokemon(
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png',
      );
    } else {
      setCatchInfo(`Pokemon ${catched} berhasil ditangkap`);
      setPokemon(newPokemon);
    }
  };

  return (
    <ImageBackground
      source={BackgroundCatch}
      style={{flex: 1, position: 'relative', alignItems: 'center'}}>
      <Text
        style={{
          color: '#000',
          fontWeight: 'bold',
          fontSize: 30,
          marginTop: 100,
        }}>
        Click The PokeBall
      </Text>
      <Text style={{color: '#000', fontWeight: 'bold', fontSize: 15}}>
        {catchInfo}
      </Text>
      <TouchableOpacity
        style={{marginTop: 100, position: 'absolute', bottom: 20}}
        onPress={() =>
          Alert.alert('Berhasil Ditangkap', 'Tambah Ke PokeBag?', [
            {
              text: 'Cancel',
              onPress: () => alert('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => alert('OK Pressed')},
          ])
        }>
        <Image source={{uri: pokemon}} style={{width: 200, height: 200}} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={catched}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 200,
        }}>
        <Animated.Image
          source={PokeBall}
          style={[styles.pokeBall]}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default CatchPokemon;

const styles = StyleSheet.create({
  pokeBall: {width: 100, height: 100},
});
