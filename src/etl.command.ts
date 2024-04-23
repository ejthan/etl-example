import { Command, CommandRunner } from 'nest-commander';

@Command({
  name: 'etl',
  description: 'An etl-example tool to show the possibilities to transform the given dataset with rxjs',
})
export class EtlCommand extends CommandRunner {
  run(passedParams: string[], options?: Record<string, any>): Promise<void> {
    console.log('ETL Command');

    return Promise.resolve();
  }
}