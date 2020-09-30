import readline from "readline";

export const askQuestion = (query: string) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans: any) => {
      rl.close();
      resolve(ans);
    })
  );
};

// Strip out white space from an object
interface obj {
  [key: string]: any;
}

export const stripWhiteSpace = (data: any) =>
  data.map((x: obj) => {
    for (let key in x) {
      //@ts-ignore
      if (typeof x[key] === "string") {
        //@ts-ignore
        x[key] = x[key].trim();
      }
    }
    return x;
  });

