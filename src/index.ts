function disableDevtool() {
  // Disable right-click
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  function ctrlShiftKey(e: KeyboardEvent, key: KeyboardEvent['key']) {
    return e.ctrlKey && e.shiftKey && e.key === key;
  }

  document.addEventListener("keydown", (e) => {
    // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
    if (
      e.key === "F12" ||
      ctrlShiftKey(e, "i") ||
      ctrlShiftKey(e, "j") ||
      (e.ctrlKey && e.key === "u")
    ) {
      e.preventDefault();
    }
  });
}

function devtoolTrap(isEnabled: string) {
  function recursiveFunction(counter: number) {
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
