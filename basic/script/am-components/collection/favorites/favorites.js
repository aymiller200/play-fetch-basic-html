import { Component, h, State } from "@stencil/core";
export class Favorites {
  constructor() {
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
        h("div", { id: "fav-container" },
          h("header", null, this.imgList.length > 0 ?
            h("am-title", { appTitle: "Your Most Favorite Pups!", class: "title" }) : h("am-title", { appTitle: "You Haven't Saved Any Pup Pictures!", class: "title" })), (_a = this.imgList) === null || _a === void 0 ? void 0 :
          _a.map(img => (h("div", { id: "img-container" },
            h("button", { id: "clear-fav", onClick: this.removeFav.bind(this, img) }, "X"),
            h("a", { href: img, rel: "noreferrer", target: "_blank" },
              h("img", { id: "saved-fav-img", src: img }))))))
        : null
    ];
  }
  static get is() { return "am-favorites"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./favorites.css"]
  }; }
  static get styleUrls() { return {
    "$": ["favorites.css"]
  }; }
  static get states() { return {
    "imgList": {},
    "open": {}
  }; }
}
