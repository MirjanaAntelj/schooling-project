const { constrainedMemory } = require("process")

describe('demoblaze first test', () => {
  it('visit', () => {
    cy.visit('https://www.demoblaze.com/index.html')
      cy.url().should("contain","/index.html")
  })

  it('signup', () => {
    cy.visit('https://www.demoblaze.com/index.html')
      cy.url().should("contain","/index.html")
    cy.get('#signin2').click()
    cy.get('#sign-username').type('Test mant',{ delay: 0 }).should('have.value','Test mant')
    cy.get('#sign-password').type('Test pass').should('have.value','Test pass')
    cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
    cy.contains('Close').click({force: true})
  })
  it('baner is visible', () => {
    cy.visit('https://www.demoblaze.com/index.html')
      cy.url().should("contain","/index.html")
    cy.get('.carousel-item').should('be.visible')
  })

  it('login', () => {
    cy.visit('https://www.demoblaze.com/index.html')
      cy.url().should("contain","/index.html")
    cy.get('#login2').click()
    cy.get('#loginusername').clear().type('Test mant',{ delay: 0 })
    cy.get('#loginpassword').clear().type('Test pass')
    cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
      cy.get('#nameofuser').should('contain','Test mant')
  })

  it('login with wrong credentials', () => {
    cy.visit('https://www.demoblaze.com/index.html')
      cy.url().should("contain","/index.html")
    cy.get('#login2').click()
    cy.get('#loginusername').clear().type('Test mant',{ delay: 0 })
    cy.get('#loginpassword').clear().type('Test wrong')
    cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
    cy.get('#nameofuser').should('not.contain','Test mant')
  })

  it('order phone', () => {
    cy.visit('https://www.demoblaze.com/index.html')
      cy.url().should("contain","/index.html")
    cy.get('#login2').click()
    cy.get('#loginusername').clear().type('Test mant',{ delay: 0 })
    cy.get('#loginpassword').clear().type('Test pass')
    cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
      cy.get('#nameofuser').should('contain','Test mant')

    cy.get('#itemc').click()
      cy.url().should("contain","/index.html#")
    cy.get('#tbodyid > div:nth-child(1) > div > div > h4 > a').click()
      cy.url().should("contain","/prod.html?idp_=1")
    cy.get('.row').contains('Add to cart').click()
    cy.on('window:alert',(txt)=>{
      expect(txt).to.contains('Product added.');
      //asert alert -  https://www.browserstack.com/guide/alerts-and-popups-in-cypress
      })
    cy.get('#cartur').click({force:true}) 
      cy.url().should("contain","/cart.html")
      cy.get('.success').should('contain','Samsung galaxy s6')
    cy.get('button').contains('Place Order').click()
      cy.get('.modal-header').should('contain','Place order')
    cy.get('#name').clear().type('Kupac Test',{ delay: 0 })
      .should('have.value', 'Kupac Test')
    cy.get('#country').clear().type('Zemlja Test',{ delay: 0 })
      .should('have.value', 'Zemlja Test')
    cy.get('#city').clear().type('Grad Test',{ delay: 0 })
      .should('have.value', 'Grad Test')
    cy.get('#card').clear().type('1123-35698555-23',{ delay: 0 })
      .should('have.value', '1123-35698555-23')
    cy.get('#month').clear().type('11')
      .should('have.value', '11')
    cy.get('#year').clear().type('2023')
      .should('have.value', '2023')
    cy.get('button').contains('Purchase').click()
      cy.get('h2').should('contain','Thank you for your purchase!')
    cy.get('button').contains('OK').click()
    //cy.get('#page-wrapper').click({force:true})
      cy.url().should("contain","/index.html")

    
    })

}) 

