const clean = (item) => (item ? item.replace(/\s\s+/g, " ").trim() : null);
const getLink = (node) => {
  let link = node.querySelector("a");
  return link ? link.href : null;
};
const getLinkText = (node) => {
  const link = node.querySelector("a");
  return link ? clean(link.textContent) : null;
};
const getNodeFromDocument = (query) => document.querySelector(query);
const getNextNodeFromDocument = (query) => {
  const node = document.querySelector(query);
  return node ? node.nextSibling : null;
};
const getTextFromDocument = (query) => {
  const node = document.querySelector(query);
  return node ? clean(node.textContent) : null;
};
const getNextTextFromDocument = (query) => {
  var _a, _b;
  const node = document.querySelector(query);
  const nextSibling =
    (_b =
      (_a = node === null || node === void 0 ? void 0 : node.nextSibling) ===
        null || _a === void 0
        ? void 0
        : _a.textContent) === null || _b === void 0
      ? void 0
      : _b.trim();
  return clean(nextSibling);
};
const getNextElementSiblingTextFromDocument = (query) => {
  var _a, _b, _c;
  return clean(
    (_c =
      (_b =
        (_a = document.querySelector(query)) === null || _a === void 0
          ? void 0
          : _a.nextElementSibling) === null || _b === void 0
        ? void 0
        : _b.textContent) === null || _c === void 0
      ? void 0
      : _c.trim()
  );
};
const makeArrayFromDocument = (query) =>
  Array.from(document.querySelectorAll(query));
const makeCleanArrayFromDocument = (query) =>
  Array.from(document.querySelectorAll(query)).map((x) =>
    clean(x.textContent ? x.textContent.trim() : null)
  );
const getFromNode = (node, query) => node.querySelector(query);
const getFromText = (node, query) => {
  var _a, _b;
  return clean(
    (_b =
      (_a = node.querySelector(query)) === null || _a === void 0
        ? void 0
        : _a.textContent) === null || _b === void 0
      ? void 0
      : _b.trim()
  );
};
const getFromLink = (node) => {
  var _a;
  return (_a = node.querySelector("a")) === null || _a === void 0
    ? void 0
    : _a.href;
};
const getNextMatch = (node, query) => {
  var _a, _b;
  return (_b =
    (_a = node.querySelector(query)) === null || _a === void 0
      ? void 0
      : _a.nextSibling) === null || _b === void 0
    ? void 0
    : _b.nodeValue;
};
const getNextElementSiblingText = (query) => {
  var _a, _b, _c;
  return clean(
    (_c =
      (_b =
        (_a = document.querySelector(query)) === null || _a === void 0
          ? void 0
          : _a.nextElementSibling) === null || _b === void 0
        ? void 0
        : _b.textContent) === null || _c === void 0
      ? void 0
      : _c.trim()
  );
};

const getNodesFromArray = (arr, query) =>
  arr.map((x) => Array.from(x.querySelectorAll(query)));

const makeTextArray = (node, query) =>
  Array.from(node.querySelectorAll(query)).map((x) =>
    clean(x.textContent ? x.textContent.trim() : null)
  );

// JQuery Methods
const getNthInstanceOfText = (node, query, num) =>
  query ? $(node).find(`${query}:eq(${num})`).text() : null;

const getNthInstanceOf = (node, query, num) =>
  query ? $(node).find(`${query}:eq(${num})`) : null;

//export const clean = (item: string | undefined | null) =>
//item ? item.replace(/\s\s+/g, " ").trim() : null;

//export const getLink = (node: Element) => {
//let link = node.querySelector("a");
//return link ? link.href : null;
//};

//export const getLinkText = (node: Element) => {
//const link = node.querySelector("a");
//return link ? clean(link.textContent) : null;
//};

//export const getNodeFromDocument = (query: string) =>
//document.querySelector(query);

//export const getNextNodeFromDocument = (query: string) => {
//const node = document.querySelector(query);
//return node ? node.nextSibling : null;
//};

//export const getTextFromDocument = (query: string) => {
//const node = document.querySelector(query);
//return node ? clean(node.textContent) : null;
//};

//export const getNextTextFromDocument = (query: string) => {
//const node = document.querySelector(query);
//const nextSibling = node?.nextSibling?.textContent?.trim();
//return clean(nextSibling);
//};

//export const getNextElementSiblingTextFromDocument = (query: string) =>
//clean(document.querySelector(query)?.nextElementSibling?.textContent?.trim());

//export const makeArrayFromDocument = (query: string) =>
//Array.from(document.querySelectorAll(query));

//export const makeCleanArrayFromDocument = (query: string) =>
//Array.from(document.querySelectorAll(query)).map((x) =>
//clean(x.textContent ? x.textContent.trim() : null)
//);

//export const getFromNode = (node: Element, query: string) =>
//node.querySelector(query);

//export const getFromText = (node: Element, query: string) =>
//clean(node.querySelector(query)?.textContent?.trim());

//export const getFromLink = (node: Element) => node.querySelector("a")?.href;

//export const getNextMatch = (node: Element, query: string) =>
//node.querySelector(query)?.nextSibling?.nodeValue;

//export const getNextElementSiblingText = (query: string) =>
//clean(document.querySelector(query)?.nextElementSibling?.textContent?.trim());

//export const getNodesFromArray = (arr: Element[], query: string) =>
//arr.map((x) => Array.from(x.querySelectorAll(query)));

//export const makeTextArray = (node: Element, query: string) =>
//Array.from(node.querySelectorAll(query)).map((x) =>
//clean(x.textContent ? x.textContent.trim() : null)
//);
