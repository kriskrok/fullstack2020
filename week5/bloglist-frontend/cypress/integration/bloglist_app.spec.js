describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Maija Mehiläinen',
      username: 'Maija',
      password: 'sateenvarjokala'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('Kindly log in to continue')
    cy.get('form').contains('username')
    cy.get('form').contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('[name=Username]').type('Maija')
      cy.get('[name=Password]').type('sateenvarjokala')
      cy.contains('login').click()

      cy.contains('blogs')
      cy.contains('logged in as Maija Mehiläinen')
    })

    it('fails with wrong credentials', function() {
      cy.get('form').contains('username').type('Nipsu')
      cy.get('form').contains('password').type('mameluk-kala')
      cy.get('button').click()

      cy.get('.notification')
        .should('contain', 'Invalid credentials, do give it a second spin')

      cy.get('html')
        .should('not.contain', 'logged in as Maija Mehiläinen')
    })
  })
})