import { exec } from "child_process";

// Chunks arrays into the size provided
export const chunk = function (size: number, arr: string[]) {
  let result = [];
  while (arr.length) {
    result.push(arr.splice(0, size));
  }
  return result;
};

// Executes a shell command and returns a promise (or rejects with error)
export const execShellCommand = (
  cmd: string,
  location: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(
      `${cmd} ${location}`,
      { maxBuffer: 1024 * 10000 }, // Set max buffer to 10 MB
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        resolve(stdout ? stdout : stderr);
      }
    );
  });
};

/**
 * Capitalizes first letters of words in string.
 * @param {string} str String to be modified
 * @param {boolean=false} lower Whether all other letters should be lowercased
 * @return {string}
 * @usage
 */
export const capitalize = (str: string, lower = false): string =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

export const clean = (item: string): string =>
  item ? item.replace(/\s\s+/g, " ").trim() : "";

export const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
