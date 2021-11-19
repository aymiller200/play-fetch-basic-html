import { Component, h, Prop, Watch } from "@stencil/core";


@Component({
  tag: 'am-dog-error',
  styleUrl: './dog-error.css',
  shadow: true
})

export class DogError {

  @Prop({mutable: true, reflect: true}) errorMessage: string

  @Watch('errorMessage')
  onErrorChange(newValue: string, oldValue: string){
    if(newValue !== oldValue){
      this.errorMessage = newValue
    }
  }

  render(){
    return(
      <p id="error">{this.errorMessage}</p>
    )
  }
}