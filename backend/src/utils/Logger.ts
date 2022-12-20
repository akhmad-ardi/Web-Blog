/* eslint-disable no-console */
import chalk from "chalk";

function log(message: string): void {
  console.log(message);
}

function Logger(text: string | undefined, type: string | void, specialText: string | void): void {
  switch (type) {
    case "info":
      if (specialText) {
        log(`[${chalk.green("INFO")}] ${chalk.white(text)} ${chalk.green(specialText)}`);
      } else {
        log(`[${chalk.green("INFO")}] ${chalk.white(text)}`);
      }
      break;

    case "error":
      if (specialText) {
        log(`[${chalk.red("ERROR")}] ${chalk.white(text)}  ${chalk.red(specialText)}`);
      } else {
        log(`[${chalk.red("ERROR")}] ${chalk.white(text)}`);
      }
      break;

    default:
      if (specialText) {
        log(`[${chalk.cyan("TEST")}] ${chalk.white(text)} ${chalk.cyan(specialText)}`);
      } else {
        log(`[${chalk.cyan("TEST")}] ${chalk.white(text)} ${chalk.cyan(specialText)}`);
      }
      break;
  }
}

export default Logger;
