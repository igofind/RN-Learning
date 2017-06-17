/**
 * Created by DELL on 2017/6/12.
 */
import React, { PureComponent } from 'react';
import { ScrollView, View } from 'react-native';
import TextInputWidget from '../../widget/LabelInput';
import Split from '../../widget/Split';
import Rule from '../../widget/RuleLink';
import screen from '../../common/screen';
import ResultHeader from '../../widget/ResultHeader';

export default class extends PureComponent {
    constructor() {
        super();
        this.state = {
            results: new Array(7).fill(0),
        };

        this.setResults = (results) => {
            this.setState({
                results,
            });
        };

        this.resetResult = () => {
            this.setState({
                results: new Array(7).fill(0),
            });
        };
    }

    render() {
        const resultItem = [
            ['偏差结算电量', '万千瓦时'],
            ['长协收益', '万元'],
            ['月度竞价收益', '万元'],
            ['偏差结算费用', '万元'],
            ['市场化前支出', '万元'],
            ['实际缴纳电费', '万元'],
        ];

        const results = this.state.results;

        return (
            <ScrollView
                style={{ flexDirection: 'column', height: screen.containerHeight }}
                overScrollMode="always"
            >
                <View style={{ flex: 1 }}>
                    <Split />
                    <ResultHeader style={{ borderRadius: 5 }} title="用户收益" value={results[0]} />
                    <Split />
                    <View >
                        {
                            resultItem.map((curr, index) => (<TextInputWidget
                                label={curr[0]}
                                key={curr.id}
                                isInput={false}
                                value={`${results[index + 1]}`}
                                textStyle={{ color: '#00aaee' }}
                                unit={curr[1]}
                            />))
                        }
                    </View>
                    <Split style={{ height: 30 }} />
                    <Rule.GuangDong navigation={this.props.navigation} />
                    <Split style={{ height: 30 }} />
                </View>
            </ScrollView>
        );
    }
}
