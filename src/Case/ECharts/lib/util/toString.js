export default function toString(obj) {
    return JSON.stringify(obj, (key, val) => {
        if (typeof val === 'function') {
            return `~--demo--~${val}~--demo--~`;
        }
        return val;
    }).replace('\"~--demo--~', '').replace('~--demo--~\"', '').replace(/\\n/g, '');
}
