import React from 'react';
import {Text, StyleSheet, View, TouchableHighlight} from 'react-native';

const Cita = ({item, deleteTask}) => {
  const dialogoEliminar = id => {
    console.log('eliminando...', id);
    deleteTask(id);
  };

  return (
    <View style={styles.cita}>
      <View>
        <Text style={styles.label}> Task:</Text>
        <Text style={styles.texto}>{item.Task}</Text>
      </View>

      <View>
        <TouchableHighlight
          onPress={() => dialogoEliminar(item.id)}
          style={styles.eliminar}>
          <Text style={styles.TextoEliminar}>Eliminar</Text>
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
  },

  texto: {
    fontSize: 20,
  },

  eliminar: {
    padding: 10,
    backgroundColor: 'red',
    marginVertical: 10,
    marginHorizontal: 10,
  },

  TextoEliminar: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default Cita;
