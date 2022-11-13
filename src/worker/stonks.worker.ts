import { Services } from './database';
import { getItemsWithCraftPrice } from './getPrices';
import { QueryWorkerCommandGetPrices, QueryWorkerCommands, WorkerCommandMessage } from './type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ctx: Worker = self as any;

const postMessageCommand = (message: string) => {
  const command: WorkerCommandMessage = { command: 'message', message };
  ctx.postMessage(command);
};

class ComputationWorker {
  services: Services;

  constructor() {
    this.services = new Services(ctx, () => {
      if (this.getPriceParams) {
        getItemsWithCraftPrice({ ...this.getPriceParams, services: this.services }).then((results) => {
          ctx.postMessage({ command: 'resultGetPrices', results });
        });
      }
    });

    this.services.cacheDuration = 3_600_000;
  }

  private getPriceParams!: QueryWorkerCommandGetPrices;

  // eslint-disable-next-line class-methods-use-this
  async getPrices(options: QueryWorkerCommandGetPrices): Promise<void> {
    // console.log('starting getPrices');
    postMessageCommand('Starting getPrices');
    getItemsWithCraftPrice({ ...options, services: this.services }).then((results) => {
      postMessageCommand('Ending getPrices');
      ctx.postMessage({ command: 'resultGetPrices', results });
    });
  }

  async forceRefresh(): Promise<void> {
    // console.log('starting getPrices');
    postMessageCommand('Starting forceRefresh');
    await this.services.forceRefresh();
  }
}

const worker = new ComputationWorker();

ctx.addEventListener('message', (event: QueryWorkerCommands) => {
  console.log({ event });
  if (event.data.command === 'getPrices') {
    worker.getPrices(event.data);
  }

  if (event.data.command === 'forceRefresh') {
    worker.forceRefresh();
  }

  if (event.data.command === 'startTimer') {
    // TODO
  }

  if (event.data.command === 'stopTimer') {
    // TODO
  }
});
