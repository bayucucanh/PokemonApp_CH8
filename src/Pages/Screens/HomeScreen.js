import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {
  GetDataPokemon,
  GetDataAfterNext,
  GetDataAfterPrevious,
  GetDataPokemonDetail,
} from '../../Redux/Action';
import {useSelector, useDispatch} from 'react-redux';
import {PokeBall, BackgroundCatch} from '../../Assets';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [halaman, setHalaman] = useState(1);

  const pokeData = useSelector(state => {
    return state.appData.pokemon;
  });

  const nextPokemon = useCallback(() => {
    if (pokeData.next === null) {
      console.log('Mentok');
    } else {
      setHalaman(halaman + 1);
      dispatch(GetDataAfterNext(pokeData.next));
    }
  });
  const previousPokemon = useCallback(() => {
    if (pokeData.previous === null) {
      console.log('mentok');
    } else {
      setHalaman(halaman - 1);
      dispatch(GetDataAfterPrevious(pokeData.previous));
    }
  });

  useEffect(() => {
    dispatch(GetDataPokemon());
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.pokemon}
      onPress={() => dispatch(GetDataPokemonDetail(item.url, navigation))}>
      <Image
        source={PokeBall}
        style={{width: 30, height: 30, marginHorizontal: 15}}
      />
      <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 15}}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={BackgroundCatch} style={styles.container}>
      <FlatList
        numColumns={2}
        columnWrapperStyle={{flex: 1, justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={pokeData.results}
        renderItem={renderItem}
      />
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => previousPokemon()}
          style={[styles.btnPagination, {backgroundColor: '#e16c2c'}]}>
          <Text style={styles.btnText}>Previous</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 15,
            marginLeft: 13,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          {halaman}
        </Text>
        <TouchableOpacity
          onPress={() => nextPokemon()}
          style={[styles.btnPagination, {backgroundColor: '#97cce2'}]}>
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f6f5',
    flex: 1,
    padding: 17,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnPagination: {
    width: 80,
    height: 40,
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  pokemon: {
    backgroundColor: '#b1736d',
    width: '45%',
    height: 50,
    marginTop: 10,
    flexDirection: 'row',
    padding: 7,
    // justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 5,
  },
});
