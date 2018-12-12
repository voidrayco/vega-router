const commander = require('commander');
const Bundler = require('parcel-bundler');

const OPTIONS = commander
  .description('Run the test app')
  .option('--port <number>', 'Set the port for the test app to listen on')
  .option('--production', 'Set the production flag')
  .parse(process.argv);

const { env } = process;

if (OPTIONS.port) env.PORT = env.PORT || OPTIONS.port;
if (OPTIONS.production) env.NODE_ENV = 'production';

async function runBundle() {
  const bundler = new Bundler('./test/index.html', {
    outDir: './test/build',
    cacheDir: './test/.cache',
    target: 'browser',
    watch: true,
  });

  return bundler.serve(env.PORT);
}

runBundle().catch(console.error);
