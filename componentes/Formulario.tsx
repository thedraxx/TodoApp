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
  const [end, guardarend] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isTimeEndPickerVisible, setTimeEndPickerVisibility] = useState(false);
  const [remind, SavePick] = useState('');
  const ObtainPick = (remind: React.SetStateAction<string>) => {
    SavePick(remind);
  };

  const [repeat, SaveRepeat] = useState('');
  const ObtainRepeat = (repeat: React.SetStateAction<string>) => {
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

  const confirmardeadline = (date: { toLocaleDateString: (arg0: string, arg1: { year: string; month: string; day: string; }) => React.SetStateAction<string>; }) => {
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

  const confirmarstart = (start: { toLocaleString: (arg0: string, arg1: { hour: string; minute: string; hour12: boolean; }) => React.SetStateAction<string>; }) => {
    const opciones = {hour: 'numeric', minute: '2-digit', hour12: false};
    guardarstart(start.toLocaleString('es-ES', opciones));
    hideTimePicker();
  };

  // Muestra u oculta el time picker end

  const showTimeEndPicker = () => {
    setTimeEndPickerVisibility(true);
  };

  const hideTimeEndPicker = () => {
    setTimeEndPickerVisibility(false);
  };

  const confirmarEnd = (end: { toLocaleString: (arg0: string, arg1: { hour: string; minute: string; }) => React.SetStateAction<string>; }) => {
    const opciones = {hour: 'numeric', minute: '2-digit'};
    guardarend(end.toLocaleString('en-US', opciones));
    hideTimeEndPicker();
  };

  
  //Crear nueva cita

  const crearNuevaCita = () => {
    //Validar
    if (
      task.trim() === '' ||
      deadline.trim() === '' ||
      start.trim() === '' ||
      end.trim() === '' ||
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
      end,
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
    // Resetear el formulario
    guardartask('');
    guardardeadline('');
    guardarstart('');
    guardarend('');
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
              mode='time'
              onConfirm={confirmarstart}
              onCancel={hideTimePicker}
              locale="es_ES"
              is24Hour
            />
            <Text>{start}</Text>
          </View>

          <View>
            <Text style={styles.label}> End: </Text>
            <Button title="end" onPress={showTimeEndPicker} />
            <DateTimePickerModal
              isVisible={isTimeEndPickerVisible}
              mode="time"
              onConfirm={confirmarEnd}
              onCancel={hideTimeEndPicker}
              locale="es_ES"
              is24Hour
            />
            <Text>{end}</Text>
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
    flex:1,
    fontWeight:'bold',
    fontSize: 15,
    marginTop: 15,
    textAlign:'left',
  },

  input: {
    marginTop: 5,
    height: 35,
    backgroundColor: '#C5C5C5',
    borderStyle: 'solid',
    borderRadius:20
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
