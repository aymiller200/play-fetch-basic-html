'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-48cb8373.js');

/*
 Stencil Client Patch Esm v2.10.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["am-dog-error_6.cjs",[[1,"am-dog-list",{"dogResults":[32],"open":[32],"loading":[32],"error":[32]}],[1,"am-favorites",{"imgList":[32],"open":[32]}],[1,"am-dog-pic-modal",{"saved":[1540],"dogTitle":[1537,"dog-title"],"hidden":[1540],"dogImg":[32],"error":[32],"loading":[32]},[[16,"dogName","onNameSelected"]]],[1,"am-dog-error",{"errorMessage":[1537,"error-message"]}],[1,"am-spinner"],[1,"am-title",{"appTitle":[1537,"app-title"]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
