import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
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
import {HomeHeader} from '../../Components/Headers';
import Loading from '../../Components/Loading';
import {baseURL} from '../../Service';
import {PokemonCard} from '../../Components/Card';
import Footer from '../../Components/Footer';

const HomeScreen = ({navigation, route}) => {
  const {userData} = route.params;
  console.log(userData);
  const dispatch = useDispatch();
  const [halaman, setHalaman] = useState(1);

  const pokeData = useSelector(state => state.appData);
  const pagination = useSelector(state => state.appData.pagination);

  const loading = useSelector(state => state.appData.isLoading);

  const nextPokemon = useCallback(() => {
    dispatch(GetDataPokemon(pagination.next));
    setHalaman(halaman + 1);
  }, [dispatch, halaman]);

  const previousPokemon = useCallback(() => {
    dispatch(GetDataPokemon(pagination.previous));
    setHalaman(halaman - 1);
  }, [dispatch, halaman]);

  useEffect(() => {
    console.log('pagination', pagination.next);
    console.log('Poke Data', pokeData);
    dispatch(GetDataPokemon(`${baseURL}?offset=${0}&limit=${20}`));
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.pokemon}
      onPress={() =>
        dispatch(GetDataPokemonDetail(item.url, navigation, userData.id))
      }>
      <Image
        source={PokeBall}
        style={{width: 30, height: 30, marginHorizontal: 15}}
      />
      <Text
        style={{
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 15,
          textTransform: 'capitalize',
        }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  // if (!loading) {
  return (
    <ImageBackground source={BackgroundCatch} style={styles.container}>
      <StatusBar backgroundColor={'#79c9f9'} />
      <HomeHeader navigation={navigation} userId={userData.id} />
      <FlatList
        numColumns={2}
        columnWrapperStyle={{flex: 1, justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        keyExtractor={pokemon => String(pokemon.id)}
        data={pokeData.pokemon}
        renderItem={({item}) => (
          <PokemonCard
            pokemon={item}
            onPress={() => navigation.navigate('DetailScreen', {id: item.id, userId: userData.id})
            }
          />
        )}
        ListFooterComponent={({item}) => (
          <Footer
            dataPokemon={item}
            nextPokemon={nextPokemon}
            previousPokemon={previousPokemon}
            halaman={halaman}
          />
        )}
      />
    </ImageBackground>
  );
  // } else {
  //   return <Loading />;
  // }
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f6f5',
    flex: 1,
    paddingHorizontal: 17,
    paddingBottom: 10,
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
    alignItems: 'center',
    borderRadius: 5,
  },
});
