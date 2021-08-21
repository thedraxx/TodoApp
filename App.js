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
  const deletetask = id => {
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
        <Text style={styles.tittle}>To-do app</Text>

        <View style={styles.contenido}>
          {mostrarform ? (
            <React.Fragment>
              <Text style={styles.task}> Add Task</Text>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                guardarMostrarForm={guardarMostrarForm}
                guardarCitasStorage={guardarCitasStorage}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text style={styles.task}>
                {' '}
                {citas.length > 0
                  ? 'Pending Tasks'
                  : '( ´ ω ` ) Thats all  for today'}
              </Text>
              <FlatList
                style={styles.listado}
                data={citas}
                renderItem={({item}) => (
                  <Cita item={item} deletetask={deletetask} />
                )}
                keyExtractor={cita => cita.id}
              />
            </React.Fragment>
          )}
        </View>

        <View>
          <TouchableHighlight
            onPress={() => mostrarFormulario()}
            style={styles.btnmostrarForm}>
            <Text style={styles.TextoMostrarForm}>
              {mostrarform ? 'Cancel' : 'Add Task'}
            </Text>
          </TouchableHighlight>
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

  task: {
    marginTop: Platform.OS === 'ios' ? 40 : 10,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tittle: {
    marginTop: Platform.OS === 'ios' ? 40 : 30,
    marginLeft: 20,
    fontSize: 25,
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
    backgroundColor: '#2dff3a',
    marginVertical: 5,
    marginHorizontal: 30,
    borderRadius: 15,
  },

  TextoMostrarForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
