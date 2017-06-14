import {StackNavigator} from "react-navigation";
import RulePage from "./page/RulePage";
import CalcScene from "./scene/CalcScene";

const stackNav = StackNavigator({
    CalcScene: {
        screen: CalcScene,
    },
    RulePage: {
        screen: RulePage,
    },
},{
    cardStyle:{
        backgroundColor: '#f5f5f5'
    }
});

export default stackNav;