Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('[id="firstName"]').type('Teste')
        .get('[id="lastName"]') .type('Teste2')
        .get('[id="email"]') .type('Teste3@gmail.com')
        .get('[id="open-text-area"]') .type("longText",{delay: 0})
        .get('button[type="submit"]') .click()
})