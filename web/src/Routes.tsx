// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Hellos" titleTo="hellos" buttonLabel="New Hello" buttonTo="newHello">
        <Route path="/hellos/new" page={HelloNewHelloPage} name="newHello" />
        <Route path="/hellos/{id:Int}/edit" page={HelloEditHelloPage} name="editHello" />
        <Route path="/hellos/{id:Int}" page={HelloHelloPage} name="hello" />
        <Route path="/hellos" page={HelloHellosPage} name="hellos" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
