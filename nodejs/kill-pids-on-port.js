import getPIDsOnPort from './get-pids-on-port.js';

export default async function killPIDsOnPort(portNumber) {
  try {
    const pids = await getPIDsOnPort(portNumber);
    if (pids.length === 0) {
      console.log(`No processes found on port ${portNumber}`);
      return;
    }

    console.log(`Found ${pids.length} processes on port ${portNumber}:`, pids);

    for (const pid of pids) {
      process.kill(pid);
      console.log(`Process ${pid} killed`);
    }

    console.log(`All processes on port ${portNumber} have been killed`);
  } catch (err) {
    console.error(`Error killing processes on port ${portNumber}:`, err);
  }
}
