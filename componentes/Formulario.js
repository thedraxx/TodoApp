import React,{useState} from 'react';
import {Text,TextInput,StyleSheet,View,Button,TouchableHighlight,Alert, ScrollView} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const Formulario = ({citas,setCitas,guardarMostrarForm}) => {

    const[paciente,guardarPaciente] = useState('');
    const[propietario,guardarPropietario] = useState('');
    const[telefono,guardarTelefono] = useState('');
    const[sintomas,guardarSintomas] = useState('');

    const[fecha,guardarFecha] = useState('');
    const[hora,guardarHora] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const mostrarAlerta = () => {
        Alert.alert(
            'Error', //titulo
            'todos los campos son obligatorios', //mensaje
            [{
                text: 'OK' //arreglo de botones 
            }]
        )
    }

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const confirmarFecha = (date) => {
        const opciones = {year:'numeric', month:'long',day:'2-digit'}
        guardarFecha(date.toLocaleDateString('es-ES',opciones));
        hideDatePicker();
    };

    // Muestra u oculta el time picker 

    const showTimePicker = () => {
        setTimePickerVisibility(true);
      };
    
      const hideTimePicker = () => {
        setTimePickerVisibility(false);
      };
    
      const confirmarHora = (hora) => {
        const opciones = {hour:'numeric', minute:'2-digit'};
        guardarHora(hora.toLocaleString('em-US',opciones));
        hideTimePicker();
      };

        //Crear nueva cita

      const crearNuevaCita = () => {
        //Validar
        if (paciente.trim() === '' || 
            propietario.trim() === '' || 
            telefono.trim() === '' || 
            fecha.trim() === '' || 
            hora.trim() === ''||
            sintomas.trim() === '') 
            {
                //falla la validacion
                mostrarAlerta();
                return;
            }

            // crear una nueva cita
           
            const cita = {paciente,propietario,telefono,fecha,hora,sintomas };
            cita.id = shortid.generate();

            //agregar al state
            const citasNuevo = [...citas,cita];
            setCitas(citasNuevo);

            // ocultar el formulario
            guardarMostrarForm(false);

            // resetar formulario
      }

    return ( 
    <ScrollView> 
        <React.Fragment>
        <View style={styles.formulario}>
            <View>
                <Text style={styles.label}> Paciente </Text>
                <TextInput 
                style={styles.input}
                onChangeText={(texto)=>guardarPaciente(texto)}
                />
            </View>

            <View>
                <Text style={styles.label}> Dueno </Text>
                <TextInput 
                style={styles.input}
                onChangeText={(texto)=>guardarPropietario(texto)}
                />
            </View>

            <View>
                <Text style={styles.label}> Telefono Contacto: </Text>
                <TextInput 
                style={styles.input}
                onChangeText={(texto)=>guardarTelefono(texto)}
                keyboardType='numeric'
                />
            </View>


            <View> 
            <Text style={styles.label}> Fecha: </Text>
                <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={confirmarFecha}
                    onCancel={hideDatePicker}
                    locale='es_ES'
                />
                <Text>{fecha} </Text>
            </View>


            <View> 
                <Text style={styles.label}> Hora: </Text>
                <Button title="Seleccionar Hora"  onPress={showTimePicker} />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={confirmarHora}
                    onCancel={hideTimePicker}
                    locale='es_ES'
                    is24Hour
                />
                <Text>{hora} </Text>
            </View>


            <View>
                <Text style={styles.label}> Sintomas: </Text>
                <TextInput 
                multiline
                style={styles.input}
                onChangeText={(texto)=>guardarSintomas(texto)}
                keyboardType='numeric'
                />
            </View>
            <View>
                <TouchableHighlight onPress={()=> crearNuevaCita() } style={styles.btnSubir}>
                <Text style={styles.TextoSubir}>Subir Nueva Cita</Text>
                </TouchableHighlight>
            </View>

        </View>
    
        </React.Fragment>
        </ScrollView>

     );
}
 

const styles = StyleSheet.create({

    formulario:{
    backgroundColor:'#fff',
    paddingHorizontal:20,
    paddingVertical:10,
    },

    label: {
        fontWeight:'bold',
        fontSize:15,
        marginTop:20,
    },


    input:{
        marginTop:5,
        height: 20,
        borderColor:'#fff',
        borderWidth:20,
        borderStyle: 'solid'
     },

     btnSubir:{
        padding: 10,
        backgroundColor:'red',
        marginVertical:10,
        marginHorizontal:1
    },

    TextoSubir:{
        color:'#FFF',
        fontWeight:'bold',
        textAlign:'center'
    },

});
export default Formulario;