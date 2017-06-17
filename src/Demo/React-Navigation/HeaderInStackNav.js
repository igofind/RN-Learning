import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

class Home extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Home',
        headerTintColor: '#fff',
        headerRight: (
            <View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('chat');
                }}
                >
                    <Text>Chat</Text>
                </TouchableOpacity>
            </View>
        ),
    });

    render() {
        return (
            <View>
                <Text>Home</Text>
            </View>
        );
    }
}

class Chat extends Component {
    static navigationOptions = {
        title: 'Chat',
    };
    render() {
        return (
            <View>
                <Text>Chat with Ryn!</Text>
            </View>
        );
    }
}

const HeaderInStackNav = StackNavigator({
    Home: {
        screen: Home,
    },
    chat: {
        screen: Chat,
    },
});

export default HeaderInStackNav;
