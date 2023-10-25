function disableDevtool() {
  // Disable right-click
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  function ctrlShiftKey(e, keyCode) {
    return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
  }

  document.onkeydown = (e) => {
    // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
    if (
      event.keyCode === 123 ||
      ctrlShiftKey(e, "I") ||
      ctrlShiftKey(e, "J") ||
      ctrlShiftKey(e, "C") ||
      (e.ctrlKey && e.keyCode === "U".charCodeAt(0))
    )
      return false;
  };
}

function devtoolTrap(isEnabled) {
  function recursiveFunction(counter) {
    if (typeof isEnabled === "string") {
      while (true) {}
    }

    if (`${isEnabled / isEnabled}`.length !== 1 || isEnabled % 20 === 0) {
      (() => true).constructor("debugger").call("action");
    } else {
      (() => false).constructor("debugger").apply("stateObject");
    }
    recursiveFunction(++counter);
  }

  try {
    if (isEnabled) {
      return recursiveFunction;
    }

    recursiveFunction(0);
  } catch (error) {}
}

// Initialize the devtools detection
(() => {
  let devtoolsWindow;
  try {
    devtoolsWindow = {}.constructor("return this")();
  } catch (error) {
    devtoolsWindow = window;
  }

  devtoolsWindow.setInterval(devtoolTrap, 4000);
})();
disableDevtool();