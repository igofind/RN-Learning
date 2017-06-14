import React, {PureComponent} from "react";
import {StyleSheet} from "react-native";
import ConsCalc from "./ConsPage.Calc";
import ConsResult from "./ConsPage.Result";
import ScrollableTabView from "react-native-scrollable-tab-view";
import Calc from "../../utils/CalcMethod";

export default class ConsCalcPage extends PureComponent {

    _doCalc(values) {
        this._tabView.goToPage(1);
        this._consResult.setResults(Calc.doConsCalc(...values));
    }

    _doReset() {
        this._consResult.resetResult();
    }

    render() {
        return (
            <ScrollableTabView ref={(tabView) => this._tabView = tabView}
                               tabBarUnderlineStyle={styles.underLine}
                               tabBarBackgroundColor='#fff'
                               tabBarTextStyle={styles.text}
                               tabBarActiveTextColor='#00aaee'
                               initialPage={0}
                               prerenderingSiblingsNumber={1}>

                <ConsCalc tabLabel="测算数据"
                          onReset={() => this._doReset()}
                          onOk={(values) => this._doCalc(values)}
                          navigation={this.props.navigation}/>

                <ConsResult ref={(e) => this._consResult = e}
                            tabLabel="测算结果"
                            navigation={this.props.navigation}/>
            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    underLine: {
        height: 2,
        backgroundColor: '#00aaee'
    },
    text: {
        fontSize: 15,
        marginTop: 10,
        fontWeight: 'normal',
        textAlignVertical: 'center',
    }
});