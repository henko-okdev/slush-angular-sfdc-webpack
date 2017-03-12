export const AppComponent = {
    template: `
    <header>
        <h1>Hello from <%= appNameCamel %>!</h1>
    </header>
    <div>
        <a ui-sref="main" ui-sref-active="active">Main</a>
        <a ui-sref="todos" ui-sref-active="active">Todos</a>

        <ui-view></ui-view>
    </div>
    <footer>
        Copyright <%= appNameCamel %> 2017.
    </footer>
  `
};