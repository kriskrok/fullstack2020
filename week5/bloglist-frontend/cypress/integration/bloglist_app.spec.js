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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('[name=Username]').type('Maija')
      cy.get('[name=Password]').type('sateenvarjokala')
      cy.contains('login').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('[name=title]').type('The Winnie the Pooh Guide to Bloggin')
      cy.get('[name=author]').type('James Charthand')
      cy.get('[name=url]').type('https://copyblogger.com/winnie-the-pooh-blogging')
      cy.get('button').contains('create').click()

      cy.get('.notification')
        .should('contain', 'brand spanking new blog The Winnie the Pooh Guide to Bloggin by James Charthand added, rejoice!')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.get('[name=title]').type('The Winnie the Pooh Guide to Bloggin')
        cy.get('[name=author]').type('James Charthand')
        cy.get('[name=url]').type('https://copyblogger.com/winnie-the-pooh-blogging')
        cy.get('button').contains('create').click()
      })

      it('it can be liked', function() {
        cy.contains('The Winnie the Pooh Guide to Bloggin by James Charthand')
        cy.get('button').contains('view').click()
        cy.get('button').contains('like').click()

        cy.contains('The Winnie the Pooh Guide to Bloggin by James Charthand').parent()
          .should('contain', 'likes 1')
      })

      it('it can be removed', function() {
        cy.contains('The Winnie the Pooh Guide to Bloggin by James Charthand')
        cy.get('button').contains('view').click()
        cy.get('button').contains('like').click()
        cy.get('button').contains('hide').click()
        cy.get('button').contains('view').click()
        cy.get('button').contains('remove').click()
      })

      it('blogs are ordered by likes', function() {
        cy.get('button').contains('new blog').click()
        cy.get('[name=title]').type('testblog2')
        cy.get('[name=author]').type('blogger2')
        cy.get('[name=url]').type('https://example.com')
        cy.get('button').contains('create').click()

        cy.get('button').contains('new blog').click()
        cy.get('[name=title]').type('testblog3')
        cy.get('[name=author]').type('blogger3')
        cy.get('[name=url]').type('https://example.com')
        cy.get('button').contains('create').click()

        cy.contains('The Winnie the Pooh Guide to Bloggin by James Charthand').parent()
          .find('button').contains('view').click().parent().find('button').contains('like').click()
          .parent().find('button').contains('like').click()
          .parent().find('button').contains('like').click()
          .parent().find('button').contains('like').click()

        cy.contains('testblog2').parent()
          .find('button').contains('view').click().parent().find('button').contains('like').click()
          .parent().find('button').contains('like').click()

        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).should('contain', 'The Winnie the Pooh')
          cy.wrap(blogs[1]).should('contain', 'testblog2')
        })
      })
    })
  })
})