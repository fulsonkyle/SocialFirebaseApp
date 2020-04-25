import React from 'react'
import {View,StyleSheet,Text} from 'react-native'

export default class MessageScreen extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>Message Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
})