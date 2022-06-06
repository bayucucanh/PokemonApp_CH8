import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {BackgroundCatch} from '../../Assets';

const DetailScreen = () => {
  const [type, setType] = useState([]);
  const [ability, setAbility] = useState([]);

  const pokemonDetail = useSelector(state => {
    return state.appData.detailPokemon;
  });

  useEffect(() => {
    setType(pokemonDetail.types);
    setAbility(pokemonDetail.abilities);
  }, []);

  const renderType = ({item}) => (
    <View>
      <Text style={{marginRight: 10}}>| {item.type.name} |</Text>
    </View>
  );

  const renderAbility = ({item}) => (
    <View>
      <Text style={{marginRight: 10}}>{item.ability.name}</Text>
    </View>
  );

  const cacthPokemon = () => {
    const numPokemon = 30;
    const catched = Math.floor(Math.random() * numPokemon);
    if (catched % 2 === 0) {
      alert('Berhasil ditangkap');
    } else {
      alert('Gagal ditangkap');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#7fad71'}}>
      <ImageBackground source={BackgroundCatch} style={styles.detailTop}>
        <Image
          source={{uri: pokemonDetail.sprites.front_default}}
          style={{
            width: 230,
            height: 230,
            marginTop: 85,
          }}
        />
      </ImageBackground>
      <View style={styles.pokemonInfo}>
        <Text
          style={{
            color: '#000',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 5,
          }}>
          {pokemonDetail.name}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginRight: 30}}>
            <Text style={styles.textLeft}>Height</Text>
            <Text style={styles.textLeft}>Weight</Text>
            <Text style={styles.textLeft}>Species</Text>
          </View>
          <View>
            <Text style={styles.textRight}>{pokemonDetail.height}</Text>
            <Text style={styles.textRight}>{pokemonDetail.weight}</Text>
            <Text style={styles.textRight}>{pokemonDetail.species.name}</Text>
          </View>
        </View>
        <Text style={styles.title}>Type</Text>
        <FlatList
          numColumns={2}
          keyExtractor={index => index.toString()}
          data={type}
          renderItem={renderType}
        />
        <Text style={styles.title}>Abilities</Text>
        <FlatList
          keyExtractor={index => index.toString()}
          data={ability}
          renderItem={renderAbility}
        />
        <TouchableOpacity onPress={cacthPokemon}>
          <Text>Cacth</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  detailTop: {
    height: 290,
    alignItems: 'center',
  },
  pokemonInfo: {
    backgroundColor: '#b0e46a',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 15,
  },
  textLeft: {
    color: '#000',
    fontWeight: '400',
  },
  textRight: {
    color: '#000',
    fontWeight: 'bold',
  },
  title: {fontWeight: 'bold', fontSize: 20, color: '#000', marginTop: 10},
});
