describe('Blog app', function () {
  beforeEach(function () {
    // empty the test db
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    // create a new user
    const user = {
      name: 'Lea Pasquire',
      username: 'lpasquire',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    //visit the homepage
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('lpasquire')
      cy.get('#password').type('secret')
      cy.get('#login').click()

      cy.contains('Lea Pasquire')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('lpasquire')
      cy.get('#password').type('secrete')
      cy.get('#login').click()

      cy.get('.error').should('contain', 'invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'border-style', 'solid')
    })
  })

})
