import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';





import EStyleSheet from 'react-native-extended-stylesheet';
import FeatherIcon from 'react-native-vector-icons/Feather';



export default class AntoineContainer extends PureComponent  {
    constructor(props) {
        super(props)

        this.state = {

        };

        // this.funct=this.funct.bind(this);

    }


    render() {
        return (
            <View style={styles.containerStyle} >
                <Text> textInComponent </Text>
            </View>
        )
    }
}



const styles = EStyleSheet.create({
    containerStyle:{

    },
    toptext: {  fontFamily: 'c-black', fontSize: '0.95rem',  },
})

