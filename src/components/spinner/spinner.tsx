import { Component, h } from "@stencil/core";

@Component({
  tag: 'am-spinner',
  styleUrl: './spinner.css',
  shadow: true
})

export class Spinner {
  render() {
    return (
      <div class="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }
}