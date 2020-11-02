export const clean = (item: string | undefined | null) =>
  item ? item.replace(/\s\s+/g, " ").trim() : null;

export const getLink = (node: Element) => {
  let link = node.querySelector("a");
  return link ? link.href : null;
};

export const getLinkText = (node: Element) => {
  const link = node.querySelector("a");
  return link ? clean(link.textContent) : null;
};

export const getNodeFromDocument = (query: string) =>
  document.querySelector(query);

export const getNextNodeFromDocument = (query: string) => {
  const node = document.querySelector(query);
  return node ? node.nextSibling : null;
};

export const getTextFromDocument = (query: string) => {
  const node = document.querySelector(query);
  return node ? clean(node.textContent) : null;
};

export const getNextTextFromDocument = (query: string) => {
  const node = document.querySelector(query);
  const nextSibling = node?.nextSibling?.textContent?.trim();
  return clean(nextSibling);
};

export const getNextElementSiblingTextFromDocument = (query: string) =>
  clean(document.querySelector(query)?.nextElementSibling?.textContent?.trim());

export const makeArrayFromDocument = (query: string) =>
  Array.from(document.querySelectorAll(query));

export const makeCleanArrayFromDocument = (query: string) =>
  Array.from(document.querySelectorAll(query)).map((x) =>
    clean(x.textContent ? x.textContent.trim() : null)
  );

export const getFromNode = (node: Element, query: string) =>
  node.querySelector(query);

export const getFromText = (node: Element, query: string) =>
  clean(node.querySelector(query)?.textContent?.trim());

export const getFromLink = (node: Element) => node.querySelector("a")?.href;

export const getNextMatch = (node: Element, query: string) =>
  node.querySelector(query)?.nextSibling?.nodeValue;

export const getNextElementSiblingText = (query: string) =>
  clean(document.querySelector(query)?.nextElementSibling?.textContent?.trim());

export const getNodesFromArray = (arr: Element[], query: string) =>
  arr.map((x) => Array.from(x.querySelectorAll(query)));

export const makeTextArray = (node: Element, query: string) =>
  Array.from(node.querySelectorAll(query)).map((x) =>
    clean(x.textContent ? x.textContent.trim() : null)
  );

export const getNthInstanceOfText = (
  node: Element,
  query: string,
  num: number
) => node.querySelectorAll(query)[num]?.textContent;

export const getNthInstanceOf = (
  node: Element,
  query: string,
  num: number
): Element | undefined => node.querySelectorAll(query)[num];

export default [
  clean,
  getLink,
  getLinkText,
  getNodeFromDocument,
  getNodeFromDocument,
  getNextNodeFromDocument,
  getTextFromDocument,
  getNextTextFromDocument,
  getNextElementSiblingText,
  makeArrayFromDocument,
  makeCleanArrayFromDocument,
  getFromNode,
  getFromText,
  getFromLink,
  getNextMatch,
  getNextElementSiblingText,
  getNodesFromArray,
  makeTextArray,
  getNthInstanceOf,
  getNthInstanceOfText,
];
