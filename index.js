#!/usr/bin/env node

import depcheck from 'depcheck';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const options = {
	ignorePatterns: ['node_modules', 'dist', 'build'],
	ignoreMatches: ['eslint'],
};

depcheck(__dirname, options, ({ dependencies, devDependencies }) => {
	const allUnused = [...dependencies, ...devDependencies];
	if (allUnused.length === 0) {
		return console.log('No unused dependencies found');
	}
	const uninstallCommand = `npm uninstall ${allUnused.join(' ')}`;
	console.log(`Running: ${uninstallCommand}`);
	exec(uninstallCommand, (err, stdout, stderr) => {
		if (err) {
			return console.error(`Error: ${stderr}`);
		}
		console.log(stdout);
		console.log('Unused dependencies removed');
	});
});
