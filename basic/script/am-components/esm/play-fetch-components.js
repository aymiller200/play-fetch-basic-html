import { p as promiseResolve, b as bootstrapLazy } from './index-cb5611d4.js';

/*
 Stencil Client Patch Browser v2.10.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["am-dog-error_6",[[1,"am-dog-list",{"dogResults":[32],"open":[32],"loading":[32],"error":[32]}],[1,"am-favorites",{"imgList":[32],"open":[32]}],[1,"am-dog-pic-modal",{"saved":[1540],"dogTitle":[1537,"dog-title"],"hidden":[1540],"dogImg":[32],"error":[32],"loading":[32]},[[16,"dogName","onNameSelected"]]],[1,"am-dog-error",{"errorMessage":[1537,"error-message"]}],[1,"am-spinner"],[1,"am-title",{"appTitle":[1537,"app-title"]}]]]], options);
});
