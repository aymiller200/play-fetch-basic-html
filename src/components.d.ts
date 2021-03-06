/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AmDogError {
        "errorMessage": string;
    }
    interface AmDogList {
    }
    interface AmDogPicModal {
        "dogTitle": string;
        "hidden": boolean;
        "saved": boolean;
    }
    interface AmFavorites {
    }
    interface AmSpinner {
    }
    interface AmTitle {
        "appTitle": string;
    }
}
declare global {
    interface HTMLAmDogErrorElement extends Components.AmDogError, HTMLStencilElement {
    }
    var HTMLAmDogErrorElement: {
        prototype: HTMLAmDogErrorElement;
        new (): HTMLAmDogErrorElement;
    };
    interface HTMLAmDogListElement extends Components.AmDogList, HTMLStencilElement {
    }
    var HTMLAmDogListElement: {
        prototype: HTMLAmDogListElement;
        new (): HTMLAmDogListElement;
    };
    interface HTMLAmDogPicModalElement extends Components.AmDogPicModal, HTMLStencilElement {
    }
    var HTMLAmDogPicModalElement: {
        prototype: HTMLAmDogPicModalElement;
        new (): HTMLAmDogPicModalElement;
    };
    interface HTMLAmFavoritesElement extends Components.AmFavorites, HTMLStencilElement {
    }
    var HTMLAmFavoritesElement: {
        prototype: HTMLAmFavoritesElement;
        new (): HTMLAmFavoritesElement;
    };
    interface HTMLAmSpinnerElement extends Components.AmSpinner, HTMLStencilElement {
    }
    var HTMLAmSpinnerElement: {
        prototype: HTMLAmSpinnerElement;
        new (): HTMLAmSpinnerElement;
    };
    interface HTMLAmTitleElement extends Components.AmTitle, HTMLStencilElement {
    }
    var HTMLAmTitleElement: {
        prototype: HTMLAmTitleElement;
        new (): HTMLAmTitleElement;
    };
    interface HTMLElementTagNameMap {
        "am-dog-error": HTMLAmDogErrorElement;
        "am-dog-list": HTMLAmDogListElement;
        "am-dog-pic-modal": HTMLAmDogPicModalElement;
        "am-favorites": HTMLAmFavoritesElement;
        "am-spinner": HTMLAmSpinnerElement;
        "am-title": HTMLAmTitleElement;
    }
}
declare namespace LocalJSX {
    interface AmDogError {
        "errorMessage"?: string;
    }
    interface AmDogList {
        "onDogName"?: (event: CustomEvent<string>) => void;
    }
    interface AmDogPicModal {
        "dogTitle"?: string;
        "hidden"?: boolean;
        "saved"?: boolean;
    }
    interface AmFavorites {
    }
    interface AmSpinner {
    }
    interface AmTitle {
        "appTitle"?: string;
    }
    interface IntrinsicElements {
        "am-dog-error": AmDogError;
        "am-dog-list": AmDogList;
        "am-dog-pic-modal": AmDogPicModal;
        "am-favorites": AmFavorites;
        "am-spinner": AmSpinner;
        "am-title": AmTitle;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "am-dog-error": LocalJSX.AmDogError & JSXBase.HTMLAttributes<HTMLAmDogErrorElement>;
            "am-dog-list": LocalJSX.AmDogList & JSXBase.HTMLAttributes<HTMLAmDogListElement>;
            "am-dog-pic-modal": LocalJSX.AmDogPicModal & JSXBase.HTMLAttributes<HTMLAmDogPicModalElement>;
            "am-favorites": LocalJSX.AmFavorites & JSXBase.HTMLAttributes<HTMLAmFavoritesElement>;
            "am-spinner": LocalJSX.AmSpinner & JSXBase.HTMLAttributes<HTMLAmSpinnerElement>;
            "am-title": LocalJSX.AmTitle & JSXBase.HTMLAttributes<HTMLAmTitleElement>;
        }
    }
}
