/**
 * Created by DELL on 2017/6/9.
 */
import React, {PureComponent} from "react";
import {View} from "react-native";
import CompCalcPage from "../page/comp/CompPage";
import DropDownTitle from "../widget/DropDownTitle";
import theme from "../common/theme";
import Config from "../common/config";
import ConsCalcPage from "../page/cons/ConsPage";
import MaskList from "../widget/MaskList";

class CalcScene extends PureComponent {

    static navigationOptions = ({navigation}) => ({
        header: null, // 使用自定义的标题可下拉的导航条
    });

    constructor() {
        super();
        this.state = {
            showCons: true,
        };

        this.currentUser = 'cons';
        // 控制是否弹出用户选择弹层
        this.isExpand = false;
    }

    _toggleList() {
        this.isExpand = !this.isExpand;
        this._userList.toggleList();
    }

    _changeUser(user, showCons) {
        this.currentUser = user;
        this.setState({
            showCons,
        });
        this._toggleList();
        this.titleBar._toggleIcon();
    }

    _getTitle() {
        switch (this.currentUser) {
            case Config.COMP:
                return Config.COMP_TITLE;
            default:
                return Config.CONS_TITLE;
        }
    }

    render() {
        return (
            <View>
                {/* 自定义Title*/}
                <DropDownTitle
                    ref={e => this.titleBar = e} onPress={() => this._toggleList()}
                    title={this._getTitle()}
                />
                {/* StackNavigator套上ScrollableTabView，错位后看不到内容，需绝对定位*/}
                <View style={[theme.maskContainer, this.state.showCons ? {} : {display: 'none'}]}>
                    <ConsCalcPage navigation={this.props.navigation}/>
                </View>
                <View style={[theme.maskContainer, !this.state.showCons ? {} : {display: 'none'}]}>
                    <CompCalcPage navigation={this.props.navigation}/>
                </View>
                <MaskList
                    ref={e => this._userList = e} initUser={this.currentUser}
                    onUserChange={(user, showCons) => this._changeUser(user, showCons)}
                />
            </View>
        );
    }
}

export default CalcScene;
