'use strict';

const index = require('./index-48cb8373.js');

/*
 Stencil Client Patch Browser v2.10.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('play-fetch-components.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["am-dog-error_6.cjs",[[1,"am-dog-list",{"dogResults":[32],"open":[32],"loading":[32],"error":[32]}],[1,"am-favorites",{"imgList":[32],"open":[32]}],[1,"am-dog-pic-modal",{"saved":[1540],"dogTitle":[1537,"dog-title"],"hidden":[1540],"dogImg":[32],"error":[32],"loading":[32]},[[16,"dogName","onNameSelected"]]],[1,"am-dog-error",{"errorMessage":[1537,"error-message"]}],[1,"am-spinner"],[1,"am-title",{"appTitle":[1537,"app-title"]}]]]], options);
});
