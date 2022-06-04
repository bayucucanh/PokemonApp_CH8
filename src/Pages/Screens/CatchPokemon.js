import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  Animated,
  Easing
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {PokeBall, BackgroundCatch} from '../../Assets';
import {GetDataPokemon} from '../../Redux/Action'

const CatchPokemon = () => {
  const dispatch = useDispatch();

  const [pokemon, setPokemon] = useState('');
  const [catchInfo, setCatchInfo] = useState(''); 

  const baseURL =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  const randNum = Math.floor(Math.random() * 60) + 1;
  let rotateAnimation = new Animated.Value(0)

  const imageSpin = () => {
    rotateAnimation.setValue(0);
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false
    }).start(() => {
      imageSpin();
    });
  }


  const RotateData = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

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

  console.log(props);
  const dummy = data;
  
  return (
      <ImageBackground
        source={BackgroundCatch}
        style={{flex: 1, position: 'relative', alignItems: 'center'}}>
        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 30,marginTop: 100 }}>Click The PokeBall</Text>
        <Text  style={{ color: '#000', fontWeight: 'bold', fontSize: 15 }}>{catchInfo}</Text>
        <Text>{ListPokemon.next}</Text>
        <TouchableOpacity style={{ marginTop: 100, position: 'absolute',
            bottom: 20, }} onPress={() => Alert.alert('Berhasil Ditangkap', 'Tambah Ke PokeBag?', [
              {
                text: "Cancel",
                onPress: () => alert("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => alert("OK Pressed") }
            ])}>
          <Image
            source={{uri: pokemon}}
            style={{width: 200, height: 200, }}
          />
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
          <Animated.Image source={PokeBall} style={[styles.pokeBall, {transform: [{rotate: RotateData}]}]} />
        </TouchableOpacity>
      </ImageBackground>
  );
};

export default CatchPokemon;

const styles = StyleSheet.create({
  pokeBall: {width: 100, height: 100}
});
