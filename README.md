# ProvaPratica

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Desafio de Debugging

Este projeto contém um componente `BuggyDashboardComponent` que foi intencionalmente quebrado para fins de avaliação. Seu objetivo é identificar e corrigir os seguintes problemas:

1.  Ao selecionar o usuário o nome não está aparecendo, apenas o email e data
2.  Está exibindo incorretamente o tempo que o usuário está cadastrado no sistema
3.  Não está exibindo os posts do usuário ao selecionar
4.  Os comentários parecem estar duplicados
5.  O contador de "Total comments" por usuário parece aumentar infinitamente ao dar refresh ou alternar entre usuários
6.  A data do comentário está com problemas ao exibir antes do nome do usuário

**Objetivo**: Corrija o código em `src/app/dashboard/buggy-dashboard.component.ts`. O código não contém comentários indicando onde estão os erros, você deve analisá-lo.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
