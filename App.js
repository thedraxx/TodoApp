import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Cita from './componentes/Cita.js';
import Formulario from './componentes/Formulario.js';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  //definir el state
  const [citas, setCitas] = useState([]);
  const [mostrarform, guardarMostrarForm] = useState(false);

  useEffect(() => {
    const obtenerCitasStorage = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem('citas');
        if (citasStorage) {
          setCitas(JSON.parse(citasStorage));
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCitasStorage();
  }, []);

  //Elimianar Pacientes del state
  const eliminarPaciente = id => {
    const citasFiltradas = citas.filter(cita => cita.id !== id);
    setCitas(citasFiltradas);
    guardarCitasStorage(JSON.stringify(citasFiltradas));
  };

  //mustra u oculta el formulario

  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarform);
  };

  //Ocultar el teclado

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };

  // Almacenar las citas en el storage

  const guardarCitasStorage = async citasJSON => {
    try {
      await AsyncStorage.setItem('citas', citasJSON);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>ADMINISTRADOR DE CITAS</Text>

        <View>
          <TouchableHighlight
            onPress={() => mostrarFormulario()}
            style={styles.btnmostrarForm}>
            <Text style={styles.TextoMostrarForm}>
              {mostrarform ? 'cancelar crear cita' : 'crear nueca cita'}
            </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.contenido}>
          {mostrarform ? (
            <React.Fragment>
              <Text style={styles.titulo}> Crear una nueva cita</Text>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                guardarMostrarForm={guardarMostrarForm}
                guardarCitasStorage={guardarCitasStorage}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text style={styles.titulo}>
                {' '}
                {citas.length > 0
                  ? 'Administra tus citas'
                  : 'No hay citas agregar una'}
              </Text>
              <FlatList
                style={styles.listado}
                data={citas}
                renderItem={({item}) => (
                  <Cita item={item} eliminarPaciente={eliminarPaciente} />
                )}
                keyExtractor={cita => cita.id}
              />
            </React.Fragment>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#FFFF',
    flex: 1,
  },

  titulo: {
    textAlign: 'left',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginLeft: 50,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },

  listado: {
    flex: 1,
  },

  btnmostrarForm: {
    padding: 10,
    backgroundColor: 'red',
    marginVertical: 5,
    marginHorizontal: 30,
  },

  TextoMostrarForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
