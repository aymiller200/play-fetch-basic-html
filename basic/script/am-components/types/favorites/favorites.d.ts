export declare class Favorites {
  imgList: string[];
  open: boolean;
  removeFav(dogName: string): void;
  displayFavs(): void;
  closeFavs(): void;
  componentWillUpdate(): void;
  render(): any[];
}
