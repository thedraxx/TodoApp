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
  task,
  settask,
  guardarMostrarForm,
  guardartaskStorage,
}) => {
  const [Task, guardarTask] = useState('');
  const [DeadLine, guardarDeadLine] = useState('');
  const [Start, guardarStart] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [pick, SavePick] = useState('');
  const ObtainPick = pick => {
    SavePick(pick);
  };

  const [repeat, SaveRepeat] = useState('');
  const ObtainRepeat = repeat => {
    SaveRepeat(repeat);
  };

  const mostrarAlerta = () => {
    Alert.alert(
      'Error', //titulo
      'todos los campos son obligatorios', //mensaje
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

  const confirmarDeadLine = date => {
    const opciones = {year: 'numeric', month: 'long', day: '2-digit'};
    guardarDeadLine(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };

  // Muestra u oculta el time picker

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarStart = Start => {
    const opciones = {hour: 'numeric', minute: '2-digit'};
    guardarStart(Start.toLocaleString('em-US', opciones));
    hideTimePicker();
  };

  //Crear nueva cita

  const crearNuevaCita = () => {
    //Validar
    if (
      Task.trim() === '' ||
      DeadLine.trim() === '' ||
      Start.trim() === '' ||
      pick.trim() === '' ||
      repeat.trim() === ''
    ) {
      //falla la validacion
      mostrarAlerta();
      return;
    }

    // crear una nueva cita

    const cita = {
      Task,
      DeadLine,
      Start,
      pick,
      repeat,
    };
    cita.id = shortid.generate();

    //agregar al state
    const taskNuevo = [...task, cita];
    settask(taskNuevo);

    // Pasar las nuevas task al Storage
    guardartaskStorage(JSON.stringify(taskNuevo));

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
              onChangeText={texto => guardarTask(texto)}
            />
          </View>

          <View>
            <Text style={styles.label}> DeadLine: </Text>
            <Button title="Seleccionar DeadLine" onPress={showDatePicker} />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={confirmarDeadLine}
              onCancel={hideDatePicker}
              locale="es_ES"
            />
            <Text>{DeadLine} </Text>
          </View>

          <View>
            <Text style={styles.label}> Start: </Text>
            <Button title="Seleccionar Start" onPress={showTimePicker} />
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={confirmarStart}
              onCancel={hideTimePicker}
              locale="es_ES"
              is24Hour
            />
            <Text>{Start} </Text>
            <View>
              <Text style={styles.label}> Remind: </Text>
              <Picker
                selectedValue={repeat}
                onValueChange={repeat => ObtainRepeat(repeat)}>
                <Picker.Item label=" -Seleccione- " value="" />
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
          </View>
          <View>
            <Text style={styles.label}> Repeat: </Text>
            <Picker
              selectedValue={pick}
              onValueChange={pick => ObtainPick(pick)}>
              <Picker.Item label=" -Seleccione- " value="" />
              <Picker.Item label=" -Diariamente- " value="Diariamente" />
              <Picker.Item label=" -Semanalmente- " value="Semanalmente" />
              <Picker.Item label=" -Mensualmente- " value="Mensualmente" />
            </Picker>
          </View>

          <View>
            <TouchableHighlight
              onPress={() => crearNuevaCita()}
              style={styles.btnSubir}>
              <Text style={styles.TextoSubir}>Subir Nueva Cita</Text>
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
    borderRadius: 25,
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
