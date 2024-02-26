# Todo List

A Todo list app to schedule your tasks based on priority

## Description

An application to save your todos. Aside from Todo title, description, due
date, you can also assign priorities, notes, subitems and reminder times for
your todos. You can make Projects to categorize your todos. By default, all
todos go in the "default" Project. Finally, you can check your completed todos
to move them into the "Completed Todos" section instead of deleting them
forever and potentially losing data.

Todos get stored in the browser's storage.

## Running locally

1. `git clone --depth=1 https://github.com/MidStein/todo-list.git`
2. `cd todo-list`
3. `npm install --production` to install dependencies
4. To view the page, paste the output of  `realpath dist/index.html` in your
browser.

## Dependencies

[Webpack](https://webpack.js.org/)
: For bundling JavaScript as well as CSS/image files for the browser

[date-fns](https://date-fns.org/)
: Date manipulation toolset library

## Screen captures

Creating a Todo

https://github.com/MidStein/todo-list/assets/78083747/bcaa7936-654f-4cd0-aadc-91b591e29866

Editing a Todo

https://github.com/MidStein/todo-list/assets/78083747/bc0977c1-fee2-4bd1-9ffc-e49cdf8da1f2
