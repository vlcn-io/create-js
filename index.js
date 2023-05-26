import fs from 'fs'
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
  const project = process.argv[2];
  const pkgjson = JSON.parse(fs.readFileSync(`${project}/package.json`, 'utf8'));
  pkgjson.name = project;
  fs.writeFileSync(`${project}/package.json`, JSON.stringify(pkgjson, null, 2));

  const toml = fs.readFileSync(`${project}/fly.toml`, 'utf8');
  fs.writeFileSync(`${project}/fly.toml`, toml.replace('vite-starter', project));

  console.log('');
	console.log(`🎉 ${chalk.green.bold('Your project has been successfully created!')} 🎉`);
  console.log(`\n${chalk.bold('Next steps:')}
  - ${yellow.bold('cd')} ${project}
  - ${yellow.bold('npm')} install
  - ${yellow.bold('npm')} run dev
`);
  process.exit(0);
});
