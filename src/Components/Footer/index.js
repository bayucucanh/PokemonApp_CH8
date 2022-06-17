import React, { memo } from 'react';
import {
  Button,
  StyleSheet, Text, View,
} from 'react-native';
import { ButtonComponent } from '../../atoms';

function Footer({
  dataPokemon, nextPokemon, previousPokemon, halaman,
}) {
  console.log('Rerender Footer');
  return (
    <View style={styles.footerContent}>

      <Button
        disable={halaman === 1}
        title="Previously"
        onPress={() => previousPokemon()}
        style={styles.buttonPagination}
      />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.textPagination}>{halaman}</Text>
      </View>
      <Button
        disabled={dataPokemon?.hasMore}
        onPress={() => nextPokemon()}
        style={styles.buttonPagination}
        title="Next"
      />
    </View>
  );
}

export default memo(Footer);

const styles = StyleSheet.create({
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    // borderTopColor: colors.border,
  },

  buttonPagination: {
    width: '30%',
  },

  textPagination: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',

  },

});