import React, {useState} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';
import {Picker} from '@react-native-picker/picker';

const Formulario = ({
  citas,
  setCitas,
  guardarMostrarForm,
  guardarCitasStorage,
}) => {
  const [task, guardartask] = useState('');
  const [deadline, guardardeadline] = useState('');
  const [start, guardarstart] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [remind, SavePick] = useState('');
  const ObtainPick = remind => {
    SavePick(remind);
  };

  const [repeat, SaveRepeat] = useState('');
  const ObtainRepeat = repeat => {
    SaveRepeat(repeat);
  };

  const mostrarAlerta = () => {
    Alert.alert(
      'Error', //titulo
      'All fields are required', //mensaje
      [
        {
          text: 'OK', //arreglo de botones
        },
      ],
    );
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmardeadline = date => {
    const opciones = {year: 'numeric', month: 'long', day: '2-digit'};
    guardardeadline(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };

  // Muestra u oculta el time picker

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarstart = start => {
    const opciones = {hour: 'numeric', minute: '2-digit'};
    guardarstart(start.toLocaleString('em-US', opciones));
    hideTimePicker();
  };

  //Crear nueva cita

  const crearNuevaCita = () => {
    //Validar
    if (
      task.trim() === '' ||
      deadline.trim() === '' ||
      start.trim() === '' ||
      remind.trim() === '' ||
      repeat.trim() === ''
    ) {
      //falla la validacion
      mostrarAlerta();
      return;
    }

    // crear una nueva cita

    const cita = {
      deadline,
      start,
      remind,
      repeat,
      task,
    };
    cita.id = shortid.generate();

    //agregar al state
    const citasNuevo = [...citas, cita];
    setCitas(citasNuevo);

    // Pasar las nuevas citas al Storage
    guardarCitasStorage(JSON.stringify(citasNuevo));

    // ocultar el formulario
    guardarMostrarForm(false);

    // resetar formulario
  };

  return (
    <ScrollView>
      <React.Fragment>
        <View style={styles.formulario}>
          <View>
            <Text style={styles.label}> Task </Text>
            <TextInput
              style={styles.input}
              onChangeText={texto => guardartask(texto)}
            />
          </View>
          <View>
            <Text style={styles.label}> Deadline: </Text>
            <Button title="Pick a Date" onPress={showDatePicker} />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={confirmardeadline}
              onCancel={hideDatePicker}
              locale="es_ES"
            />
            <Text>{deadline} </Text>
          </View>
          <View>
            <Text style={styles.label}> Start: </Text>
            <Button title="start" onPress={showTimePicker} />
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={confirmarstart}
              onCancel={hideTimePicker}
              locale="es_ES"
              is24Hour
            />
            <Text>{start} </Text>
          </View>

          <View>
            <Text style={styles.label}> Remind: </Text>
            <Picker
              selectedValue={remind}
              onValueChange={remind => ObtainPick(remind)}>
              <Picker.Item label=" -Select- " value="" />
              <Picker.Item label=" -daily- " value="daily" />
              <Picker.Item label=" -weekly- " value="weekly" />
              <Picker.Item label=" -monthly- " value="monthly" />
            </Picker>
          </View>

          <View>
            <Text style={styles.label}> Repeat: </Text>
            <Picker
              selectedValue={repeat}
              onValueChange={repeat => ObtainRepeat(repeat)}>
              <Picker.Item label=" -Select- " value="" />
              <Picker.Item
                label=" -5 minutes early- "
                value="5 minutes early"
              />
              <Picker.Item
                label=" -10 minutes early- "
                value="10 minutes early"
              />
              <Picker.Item
                label=" -15 minutes early- "
                value="15 minutes early"
              />
            </Picker>
          </View>
          <View>
            <TouchableHighlight
              onPress={() => crearNuevaCita()}
              style={styles.btnSubir}>
              <Text style={styles.TextoSubir}>Create a Task...</Text>
            </TouchableHighlight>
          </View>
        </View>
      </React.Fragment>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  label: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 20,
  },

  input: {
    marginTop: 5,
    height: 20,
    borderColor: '#fff',
    borderWidth: 20,
    borderStyle: 'solid',
  },

  btnSubir: {
    padding: 10,
    backgroundColor: '#64b688',
    marginVertical: 10,
    marginHorizontal: 1,
    borderRadius: 20,
  },

  TextoSubir: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default Formulario;
