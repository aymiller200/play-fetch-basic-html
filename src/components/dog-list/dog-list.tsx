import { Component, h, Event, EventEmitter, State } from "@stencil/core";

@Component({
  tag: 'am-dog-list',
  styleUrl: './dog-list.css',
  shadow: true
})

export class DogList {
  @State() dogResults: string[] = []
  @State() open = false
  @State() loading = false
  @State() error: string

  @Event({ bubbles: true, composed: true }) dogName: EventEmitter<string>;
  onSelectBreed(breed: string) {
    this.dogName.emit(breed)
    this.open = true
  }

  onClose() {
    this.open = false
  }

  onFetchDog() {
    this.loading = true
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(res => res.json())
      .then(parsedRes => {
        if (!parsedRes) {
          throw new Error('Something went wrong')
        }
        this.dogResults = Object.keys(parsedRes.message)
        this.error = null
        this.loading = false
      })
      .catch(err => {
        this.error = err.message
        this.dogResults = null
        this.loading = false
      })
  }

  componentWillLoad() {
    this.onFetchDog()
  }

  render() {

    return [
      <div class={this.open ? 'backdrop' : 'hidden'} onClick={this.onClose.bind(this)}></div>,

      <am-dog-pic-modal hidden={this.open ? false : true} saved={false}></am-dog-pic-modal>,

      <div id="list">
        {this.error ? <am-dog-error id="list-error" errorMessage={this.error} /> : null}
        {
          !this.loading ?
            <ul>
              {this.dogResults.map((dog) => (
                <li onClick={this.onSelectBreed.bind(this, dog)} >{dog[0].toUpperCase() + dog.slice(1)}</li>
              ))}
            </ul>
            : <am-spinner id="list-spinner" />
        }

      </div>
    ]
  }
}