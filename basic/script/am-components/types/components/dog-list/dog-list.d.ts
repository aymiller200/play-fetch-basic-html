import { EventEmitter } from "../../stencil-public-runtime";
export declare class DogList {
  dogResults: string[];
  open: boolean;
  loading: boolean;
  error: string;
  dogName: EventEmitter<string>;
  onSelectBreed(breed: string): void;
  onClose(): void;
  onFetchDog(): void;
  componentWillLoad(): void;
  render(): any[];
}
