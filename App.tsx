import React, { Component } from 'react';
import { AppRegistry , StyleSheet , Text, TextInput, View, Image , ActivityIndicator, Button } from 'react-native';

const estilos= StyleSheet.create({
  texto: {
     color: 'black',
     fontSize: 18,
     fontWeight: '400',
     paddingTop: 10
  },
  buttonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default class Clima extends Component{

  constructor(props){
    super(props);
    this.state = {
      cidade : 'Palmeira dos Índios',
      Temperatura:'',
      Descricao:'',
      Velocidade:'',
      NascerSol:'',
      PorSol:'',
      campoBusca:''
    

    };
    
  }

  componentDidMount(nomecidade){
    return fetch('https://api.hgbrasil.com/weather?key=80c70728&city_name='+nomecidade)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        cidade : responseJson.results.city_name,
        Temperatura : responseJson.results.temp,
        Descricao: responseJson.results.description,
        Velocidade: responseJson.results.wind_speedy,
        NascerSol: responseJson.results.sunrise,
        PorSol: responseJson.results.sunset,
        
        
      },function () {
      });
    })
    .catch((erro) => {
      console.error(erro);
    });
  }
  render() {
      if(this.state.carregando){
        return(
          <View style = {{flex:1 , paddingTop:20}}> 
          <ActivityIndicator />
          </View>
        );
      }

    return ( 

     <View style={{flex: 2, backgroundColor: 'gray'}}>
        <View style={{flex: 6,  justifyContent: 'center', flexDirection: 'row'}}>
        <Text style={{color:'black'}}>{this.state.results}</Text>
        <View  style={estilos.buttonContainer}> 
        <TextInput style={estilos.texto} placeholder="Informe a cidade:" onChangeText={(campoBusca)=>this.setState({campoBusca})} />
        <Button onPress={({campoBusca}) => this.componentDidMount( this.state.campoBusca)} title="Buscar" color="" />
      </View>
      
      </View>
     
      <View style={{flex : 24, justifyContent:'flex-start', flexDirection:'column' }}>
          <Text style={{color:'black', fontSize: 36, alignSelf: 'center'}} > {this.state.cidade}</Text>
          <Text style={{color:'black', fontSize: 36, alignSelf: 'center'}} > {this.state.Temperatura} °C</Text>
       </View>
      
        <View style={{flex : 15, justifyContent:'center', flexDirection:'row' }}>
          <Text style={{color:'black'}}> Descrição: {this.state. Descricao}</Text>
        </View>

        <View style={{flex : 5, justifyContent:'center', flexDirection:'row' }}>
          <Text style={{color:'black'}}>Velocidade do vento {this.state. Velocidade}</Text>
        </View>

        <View style={{flex : 4, justifyContent:'center', flexDirection:'row' }}>
          <Text style={{color:'black'}}>Nascer do Sol {this.state.NascerSol}</Text>
        </View>

        <View style={{flex : 8, justifyContent:'center', flexDirection:'row' }}>
          <Text style={{color:'black'}}>Pôr do Sol {this.state.PorSol}</Text>
        </View>
        </View>
    
            
      
      );
  }
}