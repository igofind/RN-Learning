import React, {PureComponent} from "react";

import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import Zocial from "react-native-vector-icons/Zocial";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

export default class extends PureComponent {
    render() {
        const type = this.props.type;
        const name = this.props.name;
        let target;
        switch (type) {
            default:
                target = <Entypo name={name} style={this.props.style}/>;
                break;
            case 'EvilIcons':
                target = <EvilIcons name={name} style={this.props.style}/>;
                break;
            case 'FontAwesome':
                target = <FontAwesome name={name} style={this.props.style}/>;
                break;
            case 'Foundation':
                target = <Foundation name={name} style={this.props.style}/>;
                break;
            case 'Ionicons':
                target = <Ionicons name={name} style={this.props.style}/>;
                break;
            case 'MaterialIcons':
                target = <MaterialIcons name={name} style={this.props.style}/>;
                break;
            case 'MaterialCommunityIcons':
                target = <MaterialCommunityIcons name={name} style={this.props.style}/>;
                break;
            case 'Octicons':
                target = <Octicons name={name} style={this.props.style}/>;
                break;
            case 'Zocial':
                target = <Zocial name={name} style={this.props.style}/>;
                break;
            case 'SimpleLineIcons':
                target = <SimpleLineIcons name={name} style={this.props.style}/>;
                break;
        }
        return target;
    }
}