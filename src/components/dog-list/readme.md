# am-dog-list



<!-- Auto Generated Below -->


## Events

| Event     | Description | Type                  |
| --------- | ----------- | --------------------- |
| `dogName` |             | `CustomEvent<string>` |


## Dependencies

### Depends on

- [am-dog-pic-modal](../dog-pic-modal)
- [am-dog-error](../dog-error)
- [am-spinner](../spinner)

### Graph
```mermaid
graph TD;
  am-dog-list --> am-dog-pic-modal
  am-dog-list --> am-dog-error
  am-dog-list --> am-spinner
  am-dog-pic-modal --> am-title
  am-dog-pic-modal --> am-dog-error
  am-dog-pic-modal --> am-spinner
  style am-dog-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
