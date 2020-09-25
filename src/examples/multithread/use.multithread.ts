import { Worker } from 'worker_threads';
import logUpdate from 'log-update';

const limit = 1000000;
const threads = 2;
const namesPerThread = limit / threads;
const outputFile = `${__dirname}/output/data.txt`;
const names = [...Array(threads)].fill(0);

console.time('start');

for (let i = 0; i < threads; i++) {
  const port = new Worker(require.resolve('./worker'), {
    workerData: {
      namesPerThread,
      outputFile
    }
  });
  port.on('message', data => handleMessage(data, i));
  port.on('error', e => console.log(e));
  port.on('exit', code => {
    console.log(`Exit code: ${code}`);
    console.timeLog('start');
  });
}

function handleMessage(_: any, index: number) {
  names[index]++;
  logUpdate(names.map((status, i) => `Thread ${i}: ${status}`).join('\n'));
}
