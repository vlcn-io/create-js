import degit from 'degit';
import chalk from 'chalk';
const yellow = chalk.yellow;

if (process.argv.length < 3) {
  console.error('Please provide a target directory');
  process.exit(1);
}

const emitter = degit('git@github.com:vlcn-io/vite-starter', {
	cache: false,
	force: true,
	verbose: true,
});

emitter.on('info', info => {
	console.log(info.message);
});

emitter.clone(process.argv[2]).then(() => {
  console.log('');
	console.log(`🎉 ${chalk.green.bold('Your project has been successfully created!')} 🎉`);
  console.log(`\n${chalk.bold('Next steps:')}
  - ${yellow.bold('cd')} ${process.argv[2]}
  - ${yellow.bold('npm')} install
  - ${yellow.bold('npm')} run dev
`);
  process.exit(0);
});
