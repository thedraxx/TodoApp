import React,{useState} from 'react';
import {Text,StyleSheet,View,FlatList, TouchableHighlight,ScrollView,Platform,TouchableWithoutFeedback,Keyboard} from 'react-native';
import Cita from './componentes/Cita.js';
import Formulario from './componentes/Formulario.js';

const App = () => {

  const [mostrarform, guardarMostrarForm] = useState(false);

  //definir el state 
  
  const [citas, setCitas] = useState([])

  //Elimianar Pacientes del state
  const eliminarPaciente = id => {
    setCitas((citasActuales) => {
      return citasActuales.filter(cita => cita.id !== id);
    })
  }

  //mustra u oculta el formulario 

  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarform);
  }


  //Ocultar el teclado

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }


  return (
    
      <TouchableWithoutFeedback onPress={()=>cerrarTeclado()}>
      <View style={styles.contenedor}> 
        <Text style={styles.titulo}>ADMINISTRADOR DE CITAS</Text>

        <View>
                <TouchableHighlight onPress={()=> mostrarFormulario() } style={styles.btnmostrarForm}>
                <Text style={styles.TextoMostrarForm}>{mostrarform ? 'cancelar crear cita' : 'crear nueca cita'}</Text>
                </TouchableHighlight>
        </View>

          <View style={ styles.contenido}> 
       
            {mostrarform ? (
            <React.Fragment>
              <Text style={styles.titulo}> Crear una nueva cita</Text>
                <Formulario 
                  citas={citas}
                  setCitas={setCitas}
                  guardarMostrarForm={guardarMostrarForm}
                />
            </React.Fragment> 
            ) : (
            <React.Fragment>
              <Text style={styles.titulo}> {citas.length > 0 ? 'Administra tus citas' : 'No hay citas agregar una' }</Text>
              <FlatList
                style={ styles.listado}
                data={citas}
                renderItem={ ({item})=> <Cita item={item} eliminarPaciente={eliminarPaciente}/>}
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
  contenedor:{
    backgroundColor:'#FFFF',
    flex:1
  },

 titulo:{
  textAlign:'left',
  marginTop: Platform.OS === 'ios' ? 40 : 20 ,
  marginLeft: 50,
  fontSize:15,
  fontWeight: 'bold',
  marginBottom:20,
 },

 contenido: {
   flex: 1,
   marginHorizontal:'2.5%'
 },

 listado:
 {
   flex:1,
 },

 btnmostrarForm:{
  padding: 10,
  backgroundColor:'red',
  marginVertical:5,
  marginHorizontal:30
},

TextoMostrarForm:{
  color:'#FFF',
  fontWeight:'bold',
  textAlign:'center'
},
});

export default App;
