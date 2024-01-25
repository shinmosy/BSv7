import { executeActions } from '../../main.js';
import ora from 'ora';
import chalk from 'chalk';

export async function before(m) {
    let lastActionTime = new Date().getTime();

    const executeAndLog = async () => {
        try {
            const currentTime = new Date().getTime();
            const elapsedMinutes = (currentTime - lastActionTime) / (60 * 1000);

            if (elapsedMinutes >= 15) {
                const loadingSpinner = ora({
                    text: chalk.cyan('Menjalankan tugas berkala...'),
                    spinner: 'moon'
                }).start();

                await executeActions();
                loadingSpinner.render();
                loadingSpinner.succeed(chalk.green('Tugas berkala selesai.'));

                lastActionTime = currentTime;
            }
        } catch (error) {
            const loadingSpinner = ora({
                text: chalk.red(`Gagal menjalankan tugas berkala: ${error.message}`),
                spinner: 'fail'
            }).start();

            console.error(chalk.red(`Error during periodic execution: ${error.message}`));
            loadingSpinner.stop();
        }
    };
    setInterval(executeAndLog, 15 * 60 * 1000);
}
