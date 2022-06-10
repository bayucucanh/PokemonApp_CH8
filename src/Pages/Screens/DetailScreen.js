import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {BackgroundCatch} from '../../Assets';
import database from '@react-native-firebase/database';

const DetailScreen = ({route}) => {
  const {userId} = route.params;

  const [type, setType] = useState([]);
  const [ability, setAbility] = useState([]);
  const [disableCatch, setDisableCatch] = useState(false);
  const animateCatch = useState(new Animated.Value(0))[0];

  const pokemonDetail = useSelector(state => {
    return state.appData.detailPokemon;
  });

  useEffect(() => {
    setType(pokemonDetail.types);
    setAbility(pokemonDetail.abilities);
    console.log(
      pokemonDetail?.sprites?.other['official-artwork'].front_default,
    );
    const newReference = database().ref(`/pokeBag/${userId}`);
    newReference.on('value', snapshot => {
      if (snapshot.val()) {
        checkPokemon(snapshot.val());
      }
    });
  }, [disableCatch]);

  const cacthPokemon = async () => {
    const reference = database().ref(`/pokeBag/${userId}`);
    const catched = Math.floor(Math.random() * 30);
    try {
      if (catched % 2 === 0) {
        reference.push({
          id: pokemonDetail?.id,
          name: pokemonDetail?.name,
          types: pokemonDetail.types,
          abilities: pokemonDetail.abilities,
          pokemonImg:
            pokemonDetail?.sprites?.other['official-artwork'].front_default,
        });
        setDisableCatch(false);
        alert('Pokemon caught');
        await animate();
      } else {
        alert('Pokemon failed to catch, try again');
        await animate();
      }
    } catch (error) {
      alert(Failed, 'Failed to put pokemon into your pokebag');
      await animate();
    }
  };

  const rotate = animateCatch.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6, 10],
    outputRange: ['0deg', '14deg', '-8deg', '14deg', '-4deg', '10deg', '0deg', '0deg'],
  });

  const animate = async () => {
    animateCatch.setValue(0);
    Animated.timing(animateCatch, {
      toValue: 15,
      easing: Easing.bounce,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const checkPokemon = item => {
    let keyFirebase = [];
    keyFirebase = Object.keys(item);
    for (let i = 0; i < keyFirebase.length; i++) {
      if (item[keyFirebase[i]].name.includes(pokemonDetail?.name)) {
        setDisableCatch(true);
      }
    }
  };

  const renderType = ({item}) => (
    <View>
      <Text style={{marginRight: 10, textTransform: 'capitalize'}}>{item.type.name}</Text>
    </View>
  );

  const renderAbility = ({item}) => (
    <View>
      <Text style={{marginRight: 10, textTransform: 'capitalize'}}>{item.ability.name}</Text>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#7fad71'}}>
      <ImageBackground source={BackgroundCatch} style={styles.detailTop}>
      <Animated.Image
          style={[styles.imageDetail, { transform: [{ rotate }] }]}
          source={{uri: pokemonDetail?.sprites?.other['official-artwork'].front_default}}
        />
      </ImageBackground>
      <View style={styles.pokemonInfo}>
        <Text
          style={{
            color: '#000',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 5,
            textTransform: 'capitalize'
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
          keyExtractor={(item, index) => index.toString()}
          data={type}
          renderItem={renderType}
        />
        <Text style={styles.title}>Abilities</Text>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={ability}
          renderItem={renderAbility}
        />
        {disableCatch ? null : (
          <TouchableOpacity onPress={cacthPokemon} style={styles.catchButton}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cacth</Text>
          </TouchableOpacity>
        )}
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
  catchButton: {
    width: 80,
    height: 35,
    backgroundColor: '#e16c2c',
    position: 'absolute',
    top: 15,
    right: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageDetail: {
    width: 230,
    height: 230,
    marginTop: 65,
  }
});
