describe('Blog app', function () {
  beforeEach(function () {
    // empty the test db
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    // create a new user
    const user = {
      name: 'Lea Pasquire',
      username: 'lpasquier',
      password: 'secret'
    }
    cy.registerUser(user)

    //visit the homepage
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('lpasquier')
      cy.get('#password').type('secret')
      cy.get('#login').click()

      cy.contains('Lea Pasquire')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('lpasquier')
      cy.get('#password').type('secrete')
      cy.get('#login').click()

      cy.get('.error').should('contain', 'invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      // login default user
      cy.login({ username: 'lpasquier', password: 'secret' })

      // create some random blog entries
      cy.createBlog({ title: 'first blog', author: 'cypress', url: 'localhost' })
      cy.createBlog({ title: 'second blog', author: 'cypress', url: 'localhost', likes: 1 })
      cy.createBlog({ title: 'third blog', author: 'cypress', url: 'localhost', likes: 2 })

      cy.get('.blogs').contains('first blog').parent().parent().as('firstBlog')
    })

    it('A blog can be created', function () {
      // open the blog form
      cy.get('.togglable').contains('create blog').click()

      // fill the blog form
      const blogTitle = 'cypress blog'
      cy.get('#title').type(blogTitle)
      cy.get('#author').type('cypress')
      cy.get('#url').type('localhost')

      // submit the blog form
      cy.get('button[type="submit"]').contains('create').click()

      // validate blog is added
      cy.get('.blogs').contains(blogTitle) // match the blog's title
      cy.get('.success').should('contain', `a new blog '${blogTitle}' added`)
        .should('have.css', 'color', 'rgb(0, 128, 0)')
        .should('have.css', 'border-style', 'solid')
    })

    it('user can like a blog', function () {
      const firstBlog = 'first blog'
      // expand the blog content
      cy.get('@firstBlog').contains('view').click()
      // like the blog
      cy.get('@firstBlog').contains('like').click()

      // validate blog is liked
      cy.get('.success').should('contain', `'${firstBlog}' updated, likes`)
        .should('have.css', 'color', 'rgb(0, 128, 0)')
        .should('have.css', 'border-style', 'solid')
    })

    it('user can delete his blog', function () {
      const firstBlog = 'first blog'
      // expand the blog content
      cy.get('@firstBlog').contains('view').click()
      // delete the blog
      cy.get('@firstBlog').contains('delete').click()

      // validate blog is deleted
      cy.get('.success').should('contain', `'${firstBlog}' is deleted successfully`)
        .should('have.css', 'color', 'rgb(0, 128, 0)')
        .should('have.css', 'border-style', 'solid')
    })

    it('user can not delete others blog', function () {
      // register a new user
      const newUser = {
        name: 'Alex Telal',
        username: 'atelal',
        password: 'password'
      }
      cy.registerUser(newUser)
      // login with the new user
      cy.login(newUser)

      // validate the delete button is not present for existing blog
      cy.get('@firstBlog').should('not.contain', 'delete')
    })

    it('the blogs are sorted', function () {
      let blogLikes = [2, 1, 0]
      cy.get('.blog').each(($blog, $idx) => {
        cy.wrap($blog)
          .get('.blogContent')
          .get('.likes')
          .should('contain.text', blogLikes[$idx])
      })
    })

  })

})
