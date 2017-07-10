import { StackNavigator } from 'react-navigation';
import Chat from './Chat';
import Home from './Home';
import Setting from './Setting';

const Nav = StackNavigator({
    Home: {
        screen: Home,
    },
    Chat: {
        screen: Chat,
    },
    Setting: {
        screen: Setting,
    },
});

export default Nav;
