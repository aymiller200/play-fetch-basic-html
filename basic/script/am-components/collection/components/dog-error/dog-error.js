import { Component, h, Prop, Watch } from "@stencil/core";
export class DogError {
  onErrorChange(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.errorMessage = newValue;
    }
  }
  render() {
    return (h("p", { id: "error" }, this.errorMessage));
  }
  static get is() { return "am-dog-error"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./dog-error.css"]
  }; }
  static get styleUrls() { return {
    "$": ["dog-error.css"]
  }; }
  static get properties() { return {
    "errorMessage": {
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
      "attribute": "error-message",
      "reflect": true
    }
  }; }
  static get watchers() { return [{
      "propName": "errorMessage",
      "methodName": "onErrorChange"
    }]; }
}
