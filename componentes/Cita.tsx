import React from 'react';
import {Text, StyleSheet, View, TouchableHighlight} from 'react-native';

const Cita = ({item, deletetask}) => {
  const dialogoEliminar = (id: any) => {
    console.log('eliminando...', id);
    deletetask(id);
  };

  return (
    <View style={styles.cita}>
      <View>
        <Text style={styles.label}> Task:</Text>
        <Text style={styles.texto}>{item.task}</Text>
      </View>

      <View>
        <TouchableHighlight
          onPress={() => dialogoEliminar(item.id)}
          style={styles.eliminar}>
          <Text style={styles.TextoEliminar}>Delete</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cita: {
    backgroundColor: '#FFFF',
    borderBottomColor: '#FFFF',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingVertical: 20,
  },

  label: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    textAlign:'center'
  },

  texto: {
    fontSize: 20,
    textAlign:'center',
    fontFamily:'LatoBlack'
  },

  eliminar: {
    padding: 10,
    backgroundColor: 'red',
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius:25
  },

  TextoEliminar: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default Cita;
