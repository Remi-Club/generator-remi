let changedList = [];
if (__STAGE__ === 'production') {
    function noop() { }
    window._console = {
        log: window.console.log,
    };
    window.console.log = noop;
    changedList.push('console.log');
}

export default changedList;