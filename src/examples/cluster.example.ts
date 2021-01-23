import { config } from 'dotenv';
import { cpus } from 'os';
import cluster from 'cluster';
import App from '@/app';

config();

const port = process.env.PORT || 3002;
const numCpus = cpus().length;

if (cluster.isMaster) {
  masterProcess();
} else {
  childProcess();
}

function masterProcess() {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCpus; i++) {
    console.log(`Forking process number ${i}...`);
    cluster.fork();
  }

  // Khi 'vòng đời' của Workers kết thúc,cluster sẽ tạo ra một 'exit' event
  // cho phép ta dùng chúng để thêm mới các Worker process
  cluster.on('exit', function handleExit(worker, code, signal) {
    console.log('[Cluster]', 'Worker kết thúc.', worker.process.pid);
    console.log('[Cluster]', 'Tử ẹo:', worker.exitedAfterDisconnect);

    // Nếu một Worker bị buộc kết thúc một cách vô ý như không bắt (catch) được ngoại lệ (exception).
    // Thì khi đó ta sẽ thử (try) tái tạo lại (restart) nó.
    if (!worker.exitedAfterDisconnect) {
      const worker = cluster.fork();

      // CHÝ Ý: Nếu Worker kết thúc ngay lập tức, có lẽ do code bị bug,
      // bạn có thể dính lỗi [theo tôi BIẾT] tiêu thụ tài nguyên CPU liên tục
      // (rapid CPU Consumption) do Master liên tiếp thử tạo mới các Worker.
    }
  });
}

function childProcess() {
  console.log(`Worker ${process.pid} started...`);

  const app = new App().express;

  app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
  });
}

cluster.on('exit', worker => {
  console.log('mayday! mayday! worker', worker.id, ' is no more!');
  cluster.fork();
});

// let workers: Array<Worker> = []

// function masterProcess() {
//   console.log(`Master ${process.pid} is running`)
//
//   // Fork workers
//   for (let i = 0; i < numCpus; i++) {
//     console.log(`Forking process number ${i}...`)
//
//     const worker = cluster.fork()
//     workers.push(worker)
//
//     // Listen for messages from worker
//     worker.on('message', function (message) {
//       console.log(`Master ${process.pid} recevies message '${JSON.stringify(message)}' from worker ${worker.process.pid}`)
//     })
//   }
//
//   // Send message to the workers
//   workers.forEach(function (worker: Worker) {
//     console.log(`Master ${process.pid} sends message to worker ${worker.process.pid}...`)
//     worker.send({msg: `Message from master ${process.pid}`})
//   })
//
//   process.exit();
// }

// function childProcess() {
//   console.log(`Worker ${process.pid} started`)
//
//   process.on('message', function (message) {
//     console.log(`Worker ${process.pid} recevies message '${JSON.stringify(message)}'`)
//   })
//
//   console.log(`Worker ${process.pid} sends message to master...`)
//   // @ts-ignore
//   process.send({msg: `Message from worker ${process.pid}`})
//
//   console.log(`Worker ${process.pid} finished`)
//
//   process.exit();
// }
