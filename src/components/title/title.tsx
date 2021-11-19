import { Component, h, Prop, Watch } from "@stencil/core";

@Component({
  tag: 'am-title',
  styleUrl: './title.css',
  shadow: true
})

export class Title {

  @Prop({ mutable: true, reflect: true }) appTitle: string

  @Watch('appTitle')
  onChangeTitle(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.appTitle = newValue
    }
  }

  render() {
    return (
      <h2>{this.appTitle}</h2>
    )
  }
}