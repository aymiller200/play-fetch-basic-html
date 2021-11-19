import { Component, h, State } from "@stencil/core";

@Component({
  tag: 'am-favorites',
  styleUrl: './favorites.css',
  shadow: true,
})

export class Favorites {

  @State() imgList: string[]
  @State() open = false

  removeFav(dogName: string) {
    const url = dogName.split('/').slice(4, 5).join('')
    const breed = url.split('-').slice(0, 1).join('')
    sessionStorage.removeItem(breed)
    this.imgList = Object.values({ ...sessionStorage })
  }

  displayFavs() {
    this.imgList = Object.values({ ...sessionStorage })
    this.open = true
  }

  closeFavs() {
    this.open = false
  }

  componentWillUpdate() {
    if (this.imgList.length !== sessionStorage.length) {
      this.imgList = Object.values({ ...sessionStorage })
    }
  }

  render() {
    return [
      this.open && <div id="fav-backdrop" onClick={this.closeFavs.bind(this)}></div>,
      <button id="fav-container-btn" onClick={this.displayFavs.bind(this)}>♡</button>,

      this.open ?
        <div id="fav-container">
          <header>
            {
              this.imgList.length > 0 ?
                <am-title appTitle="Your Most Favorite Pups!" class="title" /> : <am-title appTitle="You Haven't Saved Any Pup Pictures!" class="title" />
            }
          </header>
          {
            this.imgList?.map(img => (
                <div id="img-container">
                  <button id="clear-fav" onClick={this.removeFav.bind(this, img)}>X</button>
                  <a href={img} rel="noreferrer" target="_blank">
                    <img
                      id="saved-fav-img"
                      src={img}
                    ></img>
                  </a>
                </div> 

          ))}
        </div>
        : null
    ]
  }
}