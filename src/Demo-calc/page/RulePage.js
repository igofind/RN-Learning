/**
 * Created by DELL on 2017/6/10.
 */
import React, {PureComponent} from "react";
import {WebView} from "react-native";
import theme from "../common/theme";
import BarButton from "../widget/BarButton";

export default class RulePage extends PureComponent {

    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.title,
        headerTitleStyle: theme.headerTitleStyle,
        headerLeft: <BarButton type='MaterialIcons' name='close'
                               style={{marginLeft: 12}}
                               onPress={() => {
                                   navigation.goBack();
                               }}/>,
        headerTintColor: '#fff',
        headerStyle: theme.headerStyle,
    });

    render() {
        return (<WebView source={this.props.navigation.state.params.file}/>);
    }
}