//@ts-nocheck
export function clean(item: string | null) {
  return (item && item.replace(/\s\s+/g, " ").trim()) || null;
}

export function getLink(node: Element) {
  const link = node.querySelector("a");
  return link ? link.href : null;
}

export function getLinkText(node: Element) {
  const link = node.querySelector("a");
  return link ? clean(link.textContent) : null;
}

export function getNodeFromDocument(query: string) {
  return document.querySelector(query);
}

export function getNextNodeFromDocument(query: string) {
  const node = document.querySelector(query);
  return node ? node.nextSibling : null;
}

export function getTextFromDocument(query: string) {
  const node = document.querySelector(query);
  return node ? clean(node.textContent) : null;
}

export function getNextTextFromDocument(query: string) {
  const node = document.querySelector(query);
  const nextSibling = node?.nextSibling?.textContent?.trim();
  return clean(nextSibling);
}

export function getNextElementSiblingTextFromDocument(query: string) {
  return clean(
    document.querySelector(query)?.nextElementSibling?.textContent?.trim()
  );
}

export function makeArrayFromDocument(query: string) {
  return Array.from(document.querySelectorAll(query));
}

export function makeCleanArrayFromDocument(query: string) {
  return Array.from(document.querySelectorAll(query)).map((x) =>
    clean(x.textContent ? x.textContent.trim() : null)
  );
}

export function getFromNode(node: Element, query: string) {
  return node.querySelector(query);
}

export function getFromText(node: Element, query: string) {
  return clean(node.querySelector(query)?.textContent?.trim());
}

export function getFromLink(node: Element) {
  return node.querySelector("a")?.href;
}

export function getNextMatch(node: Element, query: string) {
  return node.querySelector(query)?.nextSibling?.nodeValue;
}

export function getNextElementSiblingText(query: string) {
  return clean(
    document.querySelector(query)?.nextElementSibling?.textContent?.trim()
  );
}

export function getNodesFromArray(arr: Element[], query: string) {
  return arr.map((x) => Array.from(x.querySelectorAll(query)));
}

export function makeTextArray(node: Element, query: string) {
  return Array.from(node.querySelectorAll(query)).map((x) =>
    clean(x.textContent ? x.textContent.trim() : null)
  );
}

export function getNthInstanceOfText(
  node: Element,
  query: string,
  num: number
) {
  return node.querySelectorAll(query)[num]?.textContent;
}

export function getNthInstanceOf(
  node: Element,
  query: string,
  num: number
): Element | undefined {
  return node.querySelectorAll(query)[num];
}

export default [
  clean,
  getLink,
  getLinkText,
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
  getNodesFromArray,
  makeTextArray,
  getNthInstanceOf,
  getNthInstanceOfText,
];
