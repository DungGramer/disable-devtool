declare function disableDevtool(): void;
declare function devtoolTrap(isEnabled: string): ((counter: number) => void) | undefined;
