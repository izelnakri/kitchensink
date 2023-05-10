import { exec } from 'node:child_process';

export default function getPIDsOnPort(portNumber) {
  if (!portNumber || !Number.isInteger(portNumber)) {
    throw new Error('getPIDsOnPort: portNumber must be a number');
  }

  return new Promise((resolve, reject) => {
    const cmd = process.platform === 'win32'
      ? `netstat -ano | findstr :${portNumber}`
      : `lsof -i:${portNumber} -t`;

    exec(cmd, (err, stdout) => {
      if (err) return reject(err);

      const lines = stdout.trim().split('\n');
      const pids = lines.map(line => {
        const parts = line.trim().split(/\s+/);
        return parseInt(parts[process.platform === 'win32' ? 4 : 0]);
      });

      resolve(pids);
    });
  });
}
