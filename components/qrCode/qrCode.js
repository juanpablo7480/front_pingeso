import React, { Component } from 'react'
import QRCode from 'react-native-qrcode'

export default class CodeQR extends Component{

  constructor(props){
    super(props);
  }

  state = {
    code: this.props.code
  }

  render(){
    return(
      <QRCode value = {this.state.code}
        size = {200}
        bgColor = 'black'

      />
    )
  }
}
