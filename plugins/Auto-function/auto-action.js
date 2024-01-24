import {
    executeActions
} from '../../main.js';
import ora from 'ora';
import chalk from 'chalk';

export async function before(m) {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    setInterval(async () => {
        try {
            const loadingSpinner = ora({
                text: chalk.cyan('Menjalankan tugas berkala...'),
                spinner: 'moon'
            }).start();

            await executeActions();
            loadingSpinner.render();
            loadingSpinner.succeed(chalk.green('Tugas berkala selesai.'));
        } catch (error) {
        loadingSpinner.fail(chalk.red(`Gagal menjalankan tugas berkala: ${error.message}`));
            console.error(chalk.red(`Error during periodic execution: ${error.message}`));
        }
    }, 15 * 60 * 1000);
}