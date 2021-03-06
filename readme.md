# Syringe Todos

This project has been created to describe how Syringe.js can be used to create an MVC web application.

> Syringe is a teeny-tiny dependency injection framework that allows you to dynamically assign data contracts to your functions and methods.

## Learning Syringe

Here are some links you may find helpful:

* [Documentation](https://github.com/holt/syringe#overview)
* [API Reference](https://github.com/holt/syringe#api)
* [Syringe on GitHub](https://github.com/holt/syringe)

## Syringe Todos Implementation

The Syringe Todos app presents an example of a project whose MVC components utilize dependency injection in order to dynamically obtain required information at runtime. 

The advantage of this type of architecture is that the MVC elements are largely responsible for handling their own assets and state, and this keeps the application wiring simple, scalable, and easy to manage.

### Rationale

The main design objective of a Syringe-managed system is to reduce the number of data dependencies that arise when items are passed directly between components. 

Wherever possible, application concerns should be injected as dependencies into consumer methods at runtime. Whenever a stateful method executes, any resulting _state shift_ is articulated to the other components via their own injected dependencies (instead of being passed directly).

A simple example is the "revert" action, which is invoked if the __Esc__ key is pressed whilst editing a todo item. When this happens:

1. An associated keystroke listener defined in `app.actions.proxies` is tasked with executing the `app.action.revert` and `app.helpers.repaint` methods. No arguments are passed to either of these functions. 
2. The `app.action.revert` method has references to the `app.$.todos.li`, `app.state`, and `app.collections` objects injected into it, and uses these references to obtain:
    - `app.state.cache` - the cached list item title
    - `app.collections.todolist` - the todo list collection

3. The ID of the `app.$.todos.li` (the active list item) is used to fetch the corresponding item model from `app.collections.todolist`, whose title is then reverted to that held in the state cache.

4. The `app.helpers.repaint` method executes. Again, via injection, this method has immediate access to the application views, collections, and state objects. All views are re-rendered against their associated collections and the app is updated.

In the above example, the only point at which any data is passed directly is when the title of the item model is reverted.

## Demonstration

[Click here to view the Syringe Todos app](http://holt.github.io/syringe-todos).

## License

Syringe Todos is freely distributable under the terms of the MIT license.

