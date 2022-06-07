import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import {PokebagCard} from '../../Components/Card';
import {BackgroundCatch} from '../../Assets';

const PokeBag = props => {
  const {userId} = props.route.params;
  console.log('User Id Poke bag', userId);

  const [pokebag, setPokebag] = useState([]);
  const [key, setKey] = useState([]);
  const [id, setId] = useState('');
  const [remove, setRemove] = useState(false);

  // fetch pokemon form pokebag
  const pokeBagData = async () => {
    const reference = database().ref(`/pokeBag/${userId}`);
    reference.on('value', snapshot => {
      if (snapshot.val()) {
        GetPokemon(snapshot.val());
      }
    });
  };

  useEffect(() => {
    pokeBagData();
    console.log(remove);
  }, []);

  const GetPokemon = data => {
    let keyFirebase = [];
    keyFirebase = Object.keys(data);
    setKey(keyFirebase);
    setPokebag(data);
  };

  const RemovePokemon = () => {
    Alert.alert(
      'Release Pokemon',
      `Are you sure you want to release ${pokebag[id]?.name}?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            try {
              database().ref(`/pokeBag/${userId}/${id}`).remove();
              pokeBagData();
              setRemove(false);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
    );
  };

  const chosePokemon = item => {
    setId(item);
    setRemove(true);
  };

  return (
    <ImageBackground source={BackgroundCatch} style={styles.container}>
      <Text style={styles.titleScreen}>PokeBag</Text>
      {remove === true ? (
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => setRemove(false)}
            style={styles.removeBtn}>
            <Text style={{fontSize: 13, color: '#fff', fontWeight: 'bold'}}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => RemovePokemon()}
            style={styles.removeBtn}>
            <Text style={{fontSize: 13, color: '#fff', fontWeight: 'bold'}}>
              Remove {pokebag[id]?.name}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {pokebag.length === 0 ? (
        <Text>you dont have pokemon in your pokebag</Text>
      ) : (
        <FlatList
          data={key}
          numColumns={2}
          columnWrapperStyle={{flex: 1, justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => RemovePokemon(key)}>
              <PokebagCard
                pokemonData={pokebag[item]}
                userId={userId}
                pokeBagData={pokeBagData}
                onPress={() => chosePokemon(item)}
              />
            </TouchableOpacity>
          )}
        />
      )}
    </ImageBackground>
  );
};

export default PokeBag;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  titleScreen: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  removeBtn: {
    marginRight: 15,
    width: 140,
    height: 35,
    backgroundColor: '#e16c2c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15,
  },
});
