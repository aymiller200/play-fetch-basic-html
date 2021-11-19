import { Component, h, Watch, Listen, Prop, State } from "@stencil/core";
export class DogPicModal {
  constructor() {
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
      h("div", { id: this.hidden ? "hidden" : "dog-pic-container" },
        !this.loading &&
          h("am-title", { appTitle: this.dogTitle, class: "breed-name" }),
        this.error && !this.loading ? h("am-dog-error", { errorMessage: this.error }) : null,
        this.loading ?
          h("am-spinner", null) :
          h("img", { src: this.dogImg, alt: `${this.dogTitle}`, id: "dog-image" }),
        !this.loading && sessionStorage.length >= 8 ? h("am-dog-error", { errorMessage: "Ope! You have reached your cute dog limit. Make some room in your favorites!" }) : null,
        h("div", { id: "btn-container" },
          !this.loading && !this.saved ?
            h("button", { id: "favs", disabled: sessionStorage.length >= 8, onClick: this.saveToFavs.bind(this) }, "\u2661") :
            !this.loading ? h("button", { id: "fav-saved", onClick: this.removeFromFavs.bind(this) }, "\u2661") : null,
          !this.loading && h("button", { id: "reload", onClick: this.onFetchDogPic.bind(this, this.dogTitle) }, "\u25B7")))
    ];
  }
  static get is() { return "am-dog-pic-modal"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./dog-pic-modal.css"]
  }; }
  static get styleUrls() { return {
    "$": ["dog-pic-modal.css"]
  }; }
  static get properties() { return {
    "saved": {
      "type": "boolean",
      "mutable": true,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "saved",
      "reflect": true
    },
    "dogTitle": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "dog-title",
      "reflect": true
    },
    "hidden": {
      "type": "boolean",
      "mutable": true,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "hidden",
      "reflect": true
    }
  }; }
  static get states() { return {
    "dogImg": {},
    "error": {},
    "loading": {}
  }; }
  static get watchers() { return [{
      "propName": "dogTitle",
      "methodName": "dogNameChange"
    }, {
      "propName": "hidden",
      "methodName": "hiddenChange"
    }, {
      "propName": "saved",
      "methodName": "saveChange"
    }]; }
  static get listeners() { return [{
      "name": "dogName",
      "method": "onNameSelected",
      "target": "body",
      "capture": false,
      "passive": false
    }]; }
}
