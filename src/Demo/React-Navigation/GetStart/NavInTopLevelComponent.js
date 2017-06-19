import React, { Component } from 'react';
import { Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

// TODO 什么是 Top Level Component，在这类组件中操作 Navigator有什么意义？

class LoginScreen extends Component {
    render() {
        return (
            <Text> This is login screen.</Text>
        );
    }
}

class HomeScreen extends Component {
    render() {
        return (
            <Text> This is home screen.</Text>
        );
    }
}

const AppNavigator = StackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Login: {
        screen: LoginScreen,
    },
});

class App extends Component {
    someEvent(routeName) {
        // call navigate for AppNavigator here:
        this.navigator && this.navigator.dispatch({ type: 'Navigate', routeName });
    }
    render() {
        return (
            <AppNavigator ref={(nav) => { this.navigator = nav; }} />
            // TODO 为什么放在View中 就不行了？
            /* <View>
                <Text>nia nia ?</Text>
                <AppNavigator ref={(nav) => { this.navigator = nav; }} />
                <Button title={'go login'} onPress={() => this.someEvent('Login')} />
                <Button title={'go home'} onPress={() => this.someEvent('Home')} />
            </View>*/
        );
    }
}

export default App;
