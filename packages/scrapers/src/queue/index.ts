import Queue, { Job } from "bee-queue";

interface JobOptions {
  timeout: number;
  retries: number;
}

const handleCompleted = (job: Queue.Job, jobName: string): void => {
  console.log(`✅ ${jobName} with id ${job.id} completed!`);
};

const handleFailed = (job: Queue.Job, err: Error, jobName: string): void => {
  console.error(
    `❌ ${jobName} with id ${job.id} failed! Reason: ${err.message}`
  );
};

const handleReady = (jobName: string): void => {
  console.log(`🙇 ${jobName} ready for processing!`);
};

const handleStalled = (jobId: string, jobName: string): void => {
  console.warn(`⌛ ${jobName} with ${jobId} stalled and will be retried!`);
};

type BlankObj = { [key: string]: any };
export class QueueHandler<JobResult, JobData = BlankObj> {
  constructor(
    public jobName: string,
    public work: (data: JobData) => Promise<void>
  ) {
    this.queue = new Queue(jobName, {
      redis: {
        port: parseInt(process.env.REDIS_PORT as string),
        host: process.env.REDIS_URL,
        auth_pass: process.env.REDIS_PASSWORD,
      },
    });
    this.queue.on("ready", () => handleReady(jobName));
    this.queue.on("failed", (job: Queue.Job, err: Error) =>
      handleFailed(job, err, jobName)
    );
    this.queue.on("succeeded", (job: Queue.Job) =>
      handleCompleted(job, jobName)
    );
    this.queue.on("stalled", (jobId: string) => handleStalled(jobId, jobName));
  }
  queue: Queue;

  async createJobs(opts: JobOptions, jobs?: JobData[]): Promise<void> {
    if (!jobs) {
      await this.queue
        .createJob(null)
        .timeout(opts.timeout)
        .retries(opts.retries)
        .save();
    } else {
      for (const job of jobs) {
        await this.queue
          .createJob(job)
          .timeout(opts.timeout)
          .retries(opts.retries)
          .save();
      }
    }
  }
  process(maxConcurrent?: number): void {
    this.queue.process(
      maxConcurrent ?? 1,
      async (job: Job, done: Queue.DoneCallback<null>) => {
        console.log(`🟡 Processing ${this.jobName} with id ${job.id}`);
        try {
          await this.work(job.data);
          done(null, null); // No error
        } catch (err) {
          done(err);
        }
      }
    );
  }
}
