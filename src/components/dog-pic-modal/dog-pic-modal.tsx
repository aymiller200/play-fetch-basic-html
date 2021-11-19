import { Component, h, Watch, Listen, Prop, State } from "@stencil/core";

@Component({
  tag: 'am-dog-pic-modal',
  styleUrl: './dog-pic-modal.css',
  shadow: true
})

export class DogPicModal {

  @State() dogImg: string
  @State() error: string
  @State() loading = false

  @Prop({ mutable: true, reflect: true }) saved: boolean
  @Prop({ mutable: true, reflect: true }) dogTitle: string
  @Prop({ mutable: true, reflect: true }) hidden: boolean

  @Watch('dogTitle')
  dogNameChange(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.dogTitle = newValue
      this.onFetchDogPic(newValue)
    }
  }

  @Watch('hidden')
  hiddenChange(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue) {
      this.hidden = newValue
    }
  }

  @Watch('saved')
  saveChange(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue) {
      this.saved = newValue
    }
  }

  @Listen('dogName', { target: 'body' })
  onNameSelected(event: CustomEvent) {
    if (event.detail && event.detail !== this.dogTitle) {
      this.dogTitle = event.detail
    }
  }

  saveToFavs() {
    if (sessionStorage.length < 8) {
      sessionStorage.setItem(this.dogTitle, this.dogImg)
      this.saved = true
    }
  }

  removeFromFavs() {
    sessionStorage.removeItem(this.dogTitle)
    this.saved = false
  }

  onFetchDogPic(breed: string) {
    this.loading = true
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then(res => res.json())
      .then(parsedRes => {
        if (!parsedRes['message']) {
          throw new Error('Cannot get image')
        }
        this.saved = false
        this.error = null
        this.dogImg = parsedRes['message']
        this.loading = false
      })
      .catch(err => {
        this.error = err.message
        this.dogTitle = null
        this.dogImg = null
        this.loading = false
      })
  }

  componentShouldUpdate() {
    if (sessionStorage.getItem(this.dogTitle) !== this.dogImg) {
      this.saved = false
    }
  }

  render() {
    return [
      <div id={this.hidden ? "hidden" : "dog-pic-container"}>
        {
          !this.loading &&
          <am-title appTitle={this.dogTitle} class="breed-name" />
        }
        {
          this.error && !this.loading ? <am-dog-error errorMessage={this.error}></am-dog-error> : null
        }
        {
          this.loading ?
            <am-spinner></am-spinner> :
            <img src={this.dogImg} alt={`${this.dogTitle}`} id="dog-image"
            />
        }
        {
          !this.loading && sessionStorage.length >= 8 ? <am-dog-error errorMessage="Ope! You have reached your cute dog limit. Make some room in your favorites!"></am-dog-error> : null
        }
        <div id="btn-container">
          {
            !this.loading && !this.saved ?
              <button id="favs" disabled={sessionStorage.length >= 8} onClick={this.saveToFavs.bind(this)}>♡</button> :

              !this.loading ? <button id="fav-saved" onClick={this.removeFromFavs.bind(this)}>♡</button> : null
          }

          {
            !this.loading && <button id="reload" onClick={this.onFetchDogPic.bind(this, this.dogTitle)}>▷</button>
          }
        </div>
      </div>
    ]
  }
}