import screen from './screen';

export default {
    headerTitleStyle: {
        fontWeight: 'normal',
        alignSelf: 'center',
        fontSize: 18,
        color: '#fff',
    },
    headerStyle: {
        elevation: 0,
        backgroundColor: '#00aaee',
        height: screen.titleHeight,
    },
    headerTintColor: '#fff',
    titleButton: {
        height: screen.titleHeight,
        textAlignVertical: 'center',
    },
    maskContainer: {
        position: 'absolute',
        width: screen.width,
        height: screen.containerHeight,
        left: 0,
        top: screen.titleHeight,
    },
    mask: {
        justifyContent: 'center',
        backgroundColor: '#383838',
        opacity: 0.25,
        position: 'absolute',
        width: screen.width,
        height: screen.containerHeight,
    },
    split: {
        height: 12,
    },
};
