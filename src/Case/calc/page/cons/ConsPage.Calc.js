import React, { PureComponent } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import TextInputWidget from '../../widget/LabelInput';
import Rule from '../../widget/RuleLink';
import Split from '../../widget/Split';
import ButtonTool from '../../widget/ButtonTool';

export default class extends PureComponent {
    constructor() {
        super();
        this.inputs = {};
        this._calcItems = [
            ['市场区域', 'TODO', 'scqy'],
            ['双边协商价差', '厘/千瓦时', 'sbxsjc'],
            ['双边协商月度分解电量', '万千瓦时', 'sbxsyd'],
            ['月度出清结算价差', '厘/千瓦时', 'ydcqjsjc'],
            ['月度竞价成交电量', '万千瓦时', 'ydjjcjdl'],
            ['合同总电量', '万千瓦时', 'htzdl'],
            ['实际总用电量', '万千瓦时', 'sjzdl'],
            ['综合目录电价', '万千瓦时', 'zhmldj'],
            ['允许偏差范围（±%）', '%', 'yxpcfw'],
        ];
    }

    _resetInputs() {
        const inputs = this.inputs;
        this._calcItems.map((curr) => {
            inputs[curr[2]].clear();
            return curr;
        });
    }

    _getValues() {
        const inputs = this.inputs;
        const values = [];
        // 与计算方法参数列表顺序保持一致
        const itemArr = ['htzdl', 'sjzdl', 'sbxsyd', 'sbxsjc', 'ydjjcjdl', 'ydcqjsjc', 'yxpcfw', 'zhmldj'];
        itemArr.map((curr) => {
            values.push(inputs[curr].getValue());
            return curr;
        });
        return values;
    }

    render() {
        const calcItems = this._calcItems;
        return (
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={125} style={{ flex: 1 }}>
                <ScrollView>
                    <Split />
                    <View >
                        {
                            calcItems.map((curr, index) => (<TextInputWidget
                                label={calcItems[index][0]}
                                key={curr.id}
                                unit={calcItems[index][1]}
                                isInput={true}
                                ref={(e) => { this.inputs[calcItems[index][2]] = e; }}
                            />))
                        }
                    </View>
                    <Split style={{ height: 30 }} />
                    <Rule.GuangDong navigation={this.props.navigation} />
                    <Split style={{ height: 30 }} />

                    <ButtonTool
                        onReset={() => {
                            this._resetInputs();
                            this.props.onReset();
                        }}
                        onOk={() => {
                            this.props.onOk(this._getValues());
                        }}
                    />

                    <Split style={{ height: 30 }} />
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}
