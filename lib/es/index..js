function disableDevtool() {
    // Disable right-click
    document.addEventListener("contextmenu", function (e) { return e.preventDefault(); });
    function ctrlShiftKey(e, key) {
        return e.ctrlKey && e.shiftKey && e.key === key;
    }
    document.addEventListener("keydown", function (e) {
        // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
        if (e.key === "F12" ||
            ctrlShiftKey(e, "i") ||
            ctrlShiftKey(e, "j") ||
            (e.ctrlKey && e.key === "u")) {
            e.preventDefault();
        }
    });
}
function devtoolTrap(isEnabled) {
    function recursiveFunction(counter) {
        if ("".concat(isEnabled / isEnabled).length !== 1 || isEnabled % 20 === 0) {
            (function () { return true; }).constructor("debugger").call("action");
        }
        else {
            (function () { return false; }).constructor("debugger").apply("stateObject");
        }
        recursiveFunction();
    }
    try {
        if (isEnabled) {
            return recursiveFunction;
        }
        recursiveFunction(0);
    }
    catch (error) { }
}
// Initialize the devtools detection
(function () {
    var devtoolsWindow;
    try {
        devtoolsWindow = {}.constructor("return this")();
    }
    catch (error) {
        devtoolsWindow = window;
    }
    devtoolsWindow.setInterval(devtoolTrap, 4000);
})();
disableDevtool();//# sourceMappingURL=index..js.map
