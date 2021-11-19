import { h, createEvent, proxyCustomElement } from '@stencil/core/internal/client';
export { setAssetPath, setPlatformOptions } from '@stencil/core/internal/client';

const dogErrorCss = "#error{width:50%;word-wrap:break-word;padding:8px;margin-top:0px;margin:auto;border:1px solid red;border-radius:5px;box-shadow:0 2px 8px rgba(0, 0, 0, 0.26);background-color:rgba(250, 128, 114, 0.514);font-family:'Jost', sans-serif;font-size:medium}";

let DogError = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  onErrorChange(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.errorMessage = newValue;
    }
  }
  render() {
    return (h("p", { id: "error" }, this.errorMessage));
  }
  static get watchers() { return {
    "errorMessage": ["onErrorChange"]
  }; }
  static get style() { return dogErrorCss; }
};

const dogListCss = ":host{font-family:'Jost', sans-serif;font-size:xx-large}#list{margin-top:15%}@media (min-width: 768px){#list{margin-top:8%}}#list-spinner{display:flex;justify-content:space-around}#list-error{text-align:center}ul{display:flex;justify-content:space-evenly;padding:0;margin:0;flex-wrap:wrap;list-style:none;text-align:center;width:auto}li{border-radius:0.5rem;box-shadow:0 2px 5px rgba(80, 127, 163, 0.89);padding:1.5rem;margin:0.5rem;width:100%;background-color:rgb(103, 160, 82);color:white;border:3px solid rgb(103, 160, 82)}@media (min-width: 768px){li{width:25%}}li:hover{cursor:pointer;background-color:white;color:rgb(103, 160, 82);transition:0.3s ease-out}.backdrop{position:fixed;top:0;left:0;width:100%;height:100vh;background:rgba(0, 0, 0, 0.75);z-index:10;transition:opacity 0.3s ease-out}.hidden{display:none}";

let DogList = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.dogName = createEvent(this, "dogName", 7);
    this.dogResults = [];
    this.open = false;
    this.loading = false;
  }
  onSelectBreed(breed) {
    this.dogName.emit(breed);
    this.open = true;
  }
  onClose() {
    this.open = false;
  }
  onFetchDog() {
    this.loading = true;
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(res => res.json())
      .then(parsedRes => {
      if (!parsedRes) {
        throw new Error('Something went wrong');
      }
      this.dogResults = Object.keys(parsedRes.message);
      this.error = null;
      this.loading = false;
    })
      .catch(err => {
      this.error = err.message;
      this.dogResults = null;
      this.loading = false;
    });
  }
  componentWillLoad() {
    this.onFetchDog();
  }
  render() {
    return [
      h("div", { class: this.open ? 'backdrop' : 'hidden', onClick: this.onClose.bind(this) }),
      h("am-dog-pic-modal", { hidden: this.open ? false : true, saved: false }),
      h("div", { id: "list" }, this.error ? h("am-dog-error", { id: "list-error", errorMessage: this.error }) : null, !this.loading ?
        h("ul", null, this.dogResults.map((dog) => (h("li", { onClick: this.onSelectBreed.bind(this, dog) }, dog[0].toUpperCase() + dog.slice(1)))))
        : h("am-spinner", { id: "list-spinner" }))
    ];
  }
  static get style() { return dogListCss; }
};

const dogPicModalCss = ":host{display:flex;text-align:center;justify-content:center;align-content:center}#hidden{display:none}#dog-pic-container{position:fixed;top:0;left:25;margin:auto;margin-top:5%;z-index:1000;opacity:1;background:white;border-radius:3px;box-shadow:0 2px 8px rgba(0, 0, 0, 0.63);flex-direction:column;transition:all 0.3s ease-out}#dog-pic-container .breed-name{padding:0.5rem;margin-bottom:0;margin-top:3rem;text-decoration:underline;text-transform:capitalize}#dog-image{display:inline-block;object-fit:contain;margin:0 10px;height:fit-content;width:50%}@media (min-width: 768px){#dog-image{width:450px;height:400px}}#favs{display:flex;align-content:flex-end;border-radius:0.5rem;font-size:x-large;background:rgb(103, 160, 82);border:2px solid rgb(103, 160, 82);color:white;margin:1rem 0.5rem;cursor:pointer;box-shadow:0 2px 8px rgba(80, 127, 163, 0.89)}#reload:hover,#favs:hover{background:white;color:rgb(103, 160, 82);transition:0.3s ease-out}#favs:disabled{background:#ccc;border-color:#ccc;color:rgba(0, 0, 0, 0.513);cursor:not-allowed;box-shadow:none}#btn-container{display:flex;justify-content:center}#fav-saved{border-radius:0.5rem;font-size:x-large;margin:1rem 0.5rem;background:rgb(80, 127, 163);border:2px solid rgb(80, 127, 163);color:white;cursor:pointer}#fav-saved:hover{box-shadow:0 2px 8px rgba(103, 160, 82, 0.89);transition:0.3s ease-out}#reload{border-radius:0.5rem;font-size:x-large;background:rgb(103, 160, 82);border:2px solid rgb(103, 160, 82);color:white;margin:1rem 0.5rem;cursor:pointer;box-shadow:0 2px 8px rgba(80, 127, 163, 0.89)}";

let DogPicModal = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.loading = false;
  }
  dogNameChange(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.dogTitle = newValue;
      this.onFetchDogPic(newValue);
    }
  }
  hiddenChange(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.hidden = newValue;
    }
  }
  saveChange(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.saved = newValue;
    }
  }
  onNameSelected(event) {
    if (event.detail && event.detail !== this.dogTitle) {
      this.dogTitle = event.detail;
    }
  }
  saveToFavs() {
    if (sessionStorage.length < 8) {
      sessionStorage.setItem(this.dogTitle, this.dogImg);
      this.saved = true;
    }
  }
  removeFromFavs() {
    sessionStorage.removeItem(this.dogTitle);
    this.saved = false;
  }
  onFetchDogPic(breed) {
    this.loading = true;
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then(res => res.json())
      .then(parsedRes => {
      if (!parsedRes['message']) {
        throw new Error('Cannot get image');
      }
      this.saved = false;
      this.error = null;
      this.dogImg = parsedRes['message'];
      this.loading = false;
    })
      .catch(err => {
      this.error = err.message;
      this.dogTitle = null;
      this.dogImg = null;
      this.loading = false;
    });
  }
  componentShouldUpdate() {
    if (sessionStorage.getItem(this.dogTitle) !== this.dogImg) {
      this.saved = false;
    }
  }
  render() {
    return [
      h("div", { id: this.hidden ? "hidden" : "dog-pic-container" }, !this.loading &&
        h("am-title", { appTitle: this.dogTitle, class: "breed-name" }), this.error && !this.loading ? h("am-dog-error", { errorMessage: this.error }) : null, this.loading ?
        h("am-spinner", null) :
        h("img", { src: this.dogImg, alt: `${this.dogTitle}`, id: "dog-image" }), !this.loading && sessionStorage.length >= 8 ? h("am-dog-error", { errorMessage: "Ope! You have reached your cute dog limit. Make some room in your favorites!" }) : null, h("div", { id: "btn-container" }, !this.loading && !this.saved ?
        h("button", { id: "favs", disabled: sessionStorage.length >= 8, onClick: this.saveToFavs.bind(this) }, "\u2661") :
        !this.loading ? h("button", { id: "fav-saved", onClick: this.removeFromFavs.bind(this) }, "\u2661") : null, !this.loading && h("button", { id: "reload", onClick: this.onFetchDogPic.bind(this, this.dogTitle) }, "\u25B7")))
    ];
  }
  static get watchers() { return {
    "dogTitle": ["dogNameChange"],
    "hidden": ["hiddenChange"],
    "saved": ["saveChange"]
  }; }
  static get style() { return dogPicModalCss; }
};

const favoritesCss = ":host{display:flex;flex-direction:column}#fav-container{position:fixed;display:flex;align-self:center;justify-content:center;flex-wrap:wrap;margin:auto;margin-top:2%;z-index:1000;background:white;border-radius:3px;height:80%;width:80%;box-shadow:0 2px 8px rgba(0, 0, 0, 0.63);transition:all 0.3s ease-out;overflow-y:scroll}#saved-fav-img{display:flex;object-fit:cover;padding:0.2rem;margin-top:3rem;margin:0.5rem;height:250px;width:250px}@media (min-width: 768px){#saved-fav-img{width:450px;height:400px}}header{display:flex;width:100%}.title{display:flex;text-align:center;flex-direction:row;margin:auto}#fav-container-btn{position:fixed;font-size:xx-large;right:0;top:0;margin:0.5rem;padding:0.1rem 0.5rem;border:2px solid rgb(80, 127, 163);background:rgb(80, 127, 163);border:2px solid rgb(80, 127, 163);color:white;box-shadow:0 2px 8px rgba(80, 127, 163, 0.89);cursor:pointer;border-radius:0.5rem}#fav-container-btn:hover{background:white;color:rgb(80, 127, 163);transition:0.3s ease-out}#fav-backdrop{position:fixed;top:0;left:0;width:100%;height:100vh;background:rgba(0, 0, 0, 0.75);z-index:10;opacity:1;transition:opacity 0.3s ease-out}#img-container{box-shadow:0 2px 8px rgba(80, 127, 163, 0.479);height:max-content;margin:10px}#clear-fav{display:flex;font-size:large;margin:0.5rem;float:right;color:white;background:rgba(103, 160, 82, 0.794);border:1px solid rgb(103, 160, 82);border-radius:0.2rem;cursor:pointer}#clear-fav:hover{box-shadow:0 2px 8px rgba(80, 127, 163, 0.698);transition:0.2s ease-out}";

let Favorites = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.open = false;
  }
  removeFav(dogName) {
    const url = dogName.split('/').slice(4, 5).join('');
    const breed = url.split('-').slice(0, 1).join('');
    sessionStorage.removeItem(breed);
    this.imgList = Object.values(Object.assign({}, sessionStorage));
  }
  displayFavs() {
    this.imgList = Object.values(Object.assign({}, sessionStorage));
    this.open = true;
  }
  closeFavs() {
    this.open = false;
  }
  componentWillUpdate() {
    if (this.imgList.length !== sessionStorage.length) {
      this.imgList = Object.values(Object.assign({}, sessionStorage));
    }
  }
  render() {
    var _a;
    return [
      this.open && h("div", { id: "fav-backdrop", onClick: this.closeFavs.bind(this) }),
      h("button", { id: "fav-container-btn", onClick: this.displayFavs.bind(this) }, "\u2661"),
      this.open ?
        h("div", { id: "fav-container" }, h("header", null, this.imgList.length > 0 ?
          h("am-title", { appTitle: "Your Most Favorite Pups!", class: "title" }) : h("am-title", { appTitle: "You Haven't Saved Any Pup Pictures!", class: "title" })), (_a = this.imgList) === null || _a === void 0 ? void 0 :
          _a.map(img => (h("div", { id: "img-container" }, h("button", { id: "clear-fav", onClick: this.removeFav.bind(this, img) }, "X"), h("a", { href: img, rel: "noreferrer", target: "_blank" }, h("img", { id: "saved-fav-img", src: img }))))))
        : null
    ];
  }
  static get style() { return favoritesCss; }
};

const spinnerCss = ".lds-facebook{display:inline-block;position:relative;width:80px;height:80px}.lds-facebook div{display:inline-block;position:absolute;left:8px;width:16px;background:rgb(103, 160, 82);animation:lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite}.lds-facebook div:nth-child(1){left:8px;animation-delay:-0.24s}.lds-facebook div:nth-child(2){left:32px;animation-delay:-0.12s}.lds-facebook div:nth-child(3){left:56px;animation-delay:0}@keyframes lds-facebook{0%{top:8px;height:64px}50%,100%{top:24px;height:32px}}";

let Spinner = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  render() {
    return (h("div", { class: "lds-facebook" }, h("div", null), h("div", null), h("div", null)));
  }
  static get style() { return spinnerCss; }
};

const titleCss = ":host{font-family:'Jost', sans-serif !important}h2{font-family:'Jost', sans-serif !important;margin:auto;text-align:center;word-wrap:none;font-size:xx-large;color:rgb(103, 160, 82);text-decoration:underline;padding:0.5rem;letter-spacing:1px;text-shadow:1px 1px 1px rgba(80, 127, 163, 0.952)}";

let Title = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  onChangeTitle(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.appTitle = newValue;
    }
  }
  render() {
    return (h("h2", null, this.appTitle));
  }
  static get watchers() { return {
    "appTitle": ["onChangeTitle"]
  }; }
  static get style() { return titleCss; }
};

const AmDogError = /*@__PURE__*/proxyCustomElement(DogError, [1,"am-dog-error",{"errorMessage":[1537,"error-message"]}]);
const AmDogList = /*@__PURE__*/proxyCustomElement(DogList, [1,"am-dog-list",{"dogResults":[32],"open":[32],"loading":[32],"error":[32]}]);
const AmDogPicModal = /*@__PURE__*/proxyCustomElement(DogPicModal, [1,"am-dog-pic-modal",{"saved":[1540],"dogTitle":[1537,"dog-title"],"hidden":[1540],"dogImg":[32],"error":[32],"loading":[32]},[[16,"dogName","onNameSelected"]]]);
const AmFavorites = /*@__PURE__*/proxyCustomElement(Favorites, [1,"am-favorites",{"imgList":[32],"open":[32]}]);
const AmSpinner = /*@__PURE__*/proxyCustomElement(Spinner, [1,"am-spinner"]);
const AmTitle = /*@__PURE__*/proxyCustomElement(Title, [1,"am-title",{"appTitle":[1537,"app-title"]}]);
const defineCustomElements = (opts) => {
  if (typeof customElements !== 'undefined') {
    [
      AmDogError,
  AmDogList,
  AmDogPicModal,
  AmFavorites,
  AmSpinner,
  AmTitle
    ].forEach(cmp => {
      if (!customElements.get(cmp.is)) {
        customElements.define(cmp.is, cmp, opts);
      }
    });
  }
};

export { AmDogError, AmDogList, AmDogPicModal, AmFavorites, AmSpinner, AmTitle, defineCustomElements };
