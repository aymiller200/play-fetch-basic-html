import { Component, h, Event, State } from "@stencil/core";
export class DogList {
  constructor() {
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
      h("div", { id: "list" },
        this.error ? h("am-dog-error", { id: "list-error", errorMessage: this.error }) : null,
        !this.loading ?
          h("ul", null, this.dogResults.map((dog) => (h("li", { onClick: this.onSelectBreed.bind(this, dog) }, dog[0].toUpperCase() + dog.slice(1)))))
          : h("am-spinner", { id: "list-spinner" }))
    ];
  }
  static get is() { return "am-dog-list"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./dog-list.css"]
  }; }
  static get styleUrls() { return {
    "$": ["dog-list.css"]
  }; }
  static get states() { return {
    "dogResults": {},
    "open": {},
    "loading": {},
    "error": {}
  }; }
  static get events() { return [{
      "method": "dogName",
      "name": "dogName",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      }
    }]; }
}
