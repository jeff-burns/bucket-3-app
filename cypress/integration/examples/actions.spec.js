describe('Page Test', function () {
  it('has correct content', function () {
    cy.visit('/index.html')
    cy.get('body div').should('have.attr', 'id', 'root')
    cy.get('title').should('have.text', 'Biking Weather App')
  })    
})