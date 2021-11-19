export declare class DogPicModal {
  dogImg: string;
  error: string;
  loading: boolean;
  saved: boolean;
  dogTitle: string;
  hidden: boolean;
  dogNameChange(newValue: string, oldValue: string): void;
  hiddenChange(newValue: boolean, oldValue: boolean): void;
  saveChange(newValue: boolean, oldValue: boolean): void;
  onNameSelected(event: CustomEvent): void;
  saveToFavs(): void;
  removeFromFavs(): void;
  onFetchDogPic(breed: string): void;
  componentShouldUpdate(): void;
  render(): any[];
}
