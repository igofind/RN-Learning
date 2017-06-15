import React, {PureComponent} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import theme from "../common/theme";
import Icon from "./Icon";
import BarButton from "./BarButton";

export default class extends PureComponent {
    constructor() {
        super();
        this.state = {
            shown: false,
            iconDown: 'chevron-thin-down',
            iconUp: 'chevron-thin-up',
        };
        this._toggleIcon = () => {
            this.setState({
                shown: !this.state.shown
            });
        }
    }

    render() {
        return (
            <View style={[theme.headerStyle, {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            },]}>
                <BarButton type='Entypo' name='chevron-thin-left'
                           style={[{marginLeft: 12, marginTop: 2}, theme.titleButton]}
                           onPress={() => {

                           }}/>

                <TouchableOpacity onPress={() => {
                    this._toggleIcon();
                    this.props.onPress();
                }} activeOpacity={1}>
                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <Text style={theme.headerTitleStyle}>{this.props.title}</Text>
                        <Icon type="Entypo" name={this.state.shown ? this.state.iconUp : this.state.iconDown}
                              style={{fontSize: 14, textAlignVertical: 'center', color: '#fff', marginLeft: -5}}/>
                    </View>
                </TouchableOpacity>
                <BarButton type='Entypo' name='dots-three-horizontal' style={[{marginRight: 12}, theme.titleButton]}
                           onPress={() => {

                           }}/>
            </View>
        );
    }
}