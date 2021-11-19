import { Component, h, Prop, Watch } from "@stencil/core";
export class Title {
  onChangeTitle(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.appTitle = newValue;
    }
  }
  render() {
    return (h("h2", null, this.appTitle));
  }
  static get is() { return "am-title"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./title.css"]
  }; }
  static get styleUrls() { return {
    "$": ["title.css"]
  }; }
  static get properties() { return {
    "appTitle": {
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
      "attribute": "app-title",
      "reflect": true
    }
  }; }
  static get watchers() { return [{
      "propName": "appTitle",
      "methodName": "onChangeTitle"
    }]; }
}
