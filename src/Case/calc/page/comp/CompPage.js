import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CompCalc from './CompPage.Calc';
import CompResult from './CompPage.Result';
import Calc from '../../utils/CalcMethod';

const styles = StyleSheet.create({
    underLine: {
        height: 2,
        backgroundColor: '#00aaee',
    },
    text: {
        fontSize: 15,
        marginTop: 10,
        fontWeight: 'normal',
        textAlignVertical: 'center',
    },
});

export default class ConsCalcPage extends PureComponent {

    _doCalc(values) {
        this._tabView.goToPage(1);
        this._compResult.setResults(Calc.doCompCalc(...values));
    }

    _doReset() {
        this._compResult.resetResult();
    }

    render() {
        return (
            <ScrollableTabView
                ref={(tabView) => { this._tabView = tabView; }}
                tabBarUnderlineStyle={styles.underLine}
                tabBarBackgroundColor="#fff"
                tabBarTextStyle={styles.text}
                tabBarActiveTextColor="#00aaee"
                initialPage={0}
                prerenderingSiblingsNumber={1}
            >

                <CompCalc
                    tabLabel="测算数据"
                    onReset={() => this._doReset()}
                    onOk={values => this._doCalc(values)}
                    navigation={this.props.navigation}
                />

                <CompResult
                    tabLabel="测算结果"
                    ref={(e) => { this._compResult = e; }}
                    navigation={this.props.navigation}
                />
            </ScrollableTabView>
        );
    }
}
