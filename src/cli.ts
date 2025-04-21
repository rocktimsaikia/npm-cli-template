#!/usr/bin/env node

import { stdout } from "node:process";
import { NAME } from "@/constants";
import { parse } from "@bomb.sh/args";
import chalk from "chalk";
import dedent from "dedent";
import updateNotifier from "update-notifier";
import packageJson from "../package.json";

// Update notifier
updateNotifier({ pkg: packageJson }).notify();

// Initialize arguments
const argv = process.argv.slice(2);
const args = parse(argv, {
	alias: { h: "help", v: "version" },
	boolean: ["help", "version", "--delete-all"],
});

(async () => {
	// --version
	if (args.version) {
		return stdout.write(`${packageJson.version}\n`);
	}

	// --help
	if (args.help) {
		return stdout.write(dedent`
            Usage: npm-cli [options]

            Commands:
              npm-cli [command]         does something.

            Options:
              -h, --help         display this help message.
              -v, --version      display version number.
        `);
	}

	// No commands passed
	if (args._.length === 0) {
		stdout.write(chalk.green(NAME));
	}

	// All other commands
	if (args._.length > 0) {
		const firstArg = args._[0];
		const restArgs = args._.slice(1).filter(Boolean);

		switch (firstArg) {
			case "[command_1st]": {
				break;
			}

			case "[command_2nd]": {
				break;
			}

			default:
				stdout.write("\nUnknown command!\n");
				break;
		}
	}
})();
