import React, {Component} from "react";
import {Text, TextInput, View} from "react-native";
import {StackNavigator} from "react-navigation";
class Home extends Component {
    static navigationOptions = (({navigation}) => {
            return {
                title: `Header is ${ navigation.state.params.user }`
            }
        }
    );

    constructor() {
        super();
    }

    render() {
        const navigation = this.props.navigation;
        const {setParams} = navigation;
        return (
            <View>
                <Text>自定义 StackNavigator header !</Text>
                {/* setParams 每次调用都会重新导航当前页面（重新render）？ */}
                <TextInput
                    value={navigation.state.params.user}
                    onChangeText={(newValue) => {
                        setParams({user: newValue})
                    }}/>
            </View>
        );
    }
}

export default ScreenNavigationProp = StackNavigator({
    Home: {
        screen: Home,
    },
}, {
    initialRouteName: 'Home',
    initialRouteParams: {
        user: 'Ryn'
    },
});