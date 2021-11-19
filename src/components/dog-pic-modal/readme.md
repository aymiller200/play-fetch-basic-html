# am-dog-pic-modal



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description | Type      | Default     |
| ---------- | ----------- | ----------- | --------- | ----------- |
| `dogTitle` | `dog-title` |             | `string`  | `undefined` |
| `hidden`   | `hidden`    |             | `boolean` | `undefined` |
| `saved`    | `saved`     |             | `boolean` | `undefined` |


## Dependencies

### Used by

 - [am-dog-list](../dog-list)

### Depends on

- [am-title](../title)
- [am-dog-error](../dog-error)
- [am-spinner](../spinner)

### Graph
```mermaid
graph TD;
  am-dog-pic-modal --> am-title
  am-dog-pic-modal --> am-dog-error
  am-dog-pic-modal --> am-spinner
  am-dog-list --> am-dog-pic-modal
  style am-dog-pic-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
