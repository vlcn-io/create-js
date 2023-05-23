import degit from 'degit';

const emitter = degit('git@github.com:vlcn-io/vite-starter', {
	cache: false,
	force: true,
	verbose: true,
});

emitter.on('info', info => {
	console.log(info.message);
});

emitter.clone(process.argv[2]).then(() => {
	console.log('done');
  process.exit(0);
});
