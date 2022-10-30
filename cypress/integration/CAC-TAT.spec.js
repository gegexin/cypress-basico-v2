/// <reference types="Cypress" />

beforeEach(() => {
    cy.visit('./src/index.html')
    })

describe('Central de Atendimento ao Cliente TAT', function() {
    it('verifica o título da aplicação', function() {
  
            cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })


    it('Preenche os campos obrigatórios e envia o formulário', function(){

        const longText = "Teste Teste Teste Teste Teste Teste TesteTeste Teste Teste Teste Teste Teste TesteTeste Teste Teste Teste Teste Teste TesteTeste Teste Teste Teste Teste Teste Teste"

        cy.get('[id="firstName"]').type('Teste')
          .get('[id="lastName"]') .type('Teste2')
          .get('[id="email"]') .type('Teste3@gmail.com')
        //  .get('[id="phone"]').type('teste')
          .get('[id="open-text-area"]') .type(longText,{delay: 0})
          cy.contains('button', 'Enviar') .click()

          .get('[class="success"]').should('be.visible')

    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){

        cy.get('[id="email"]').type('teste')
          .get('button[type="submit"]').click() 
          .get('[class="error"]').should('be.visible')


    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){

        cy.get('[id="firstName"]').type('teste')
        .get('[id="lastName"]').type('teste')
        .get('[id="email"]').type('teste@teste.com')
        .get('[id="phone-checkbox"]').check()
        .get('[id="open-text-area"]').type('askdhausgdiahsdiuahsduiahsiduhasdassdasdas', {delay: 0})
        .get('button[type="submit"]').click()

        .get('[class="error"]').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        
        cy.get('[id="firstName"]').type('teste').should('have.value', 'teste')
        .get('[id="lastName"]').type('teste').should('have.value', 'teste')
        .get('[id="email"]').type('teste@teste.com').should('have.value', 'teste@teste.com')
        .get('[id="phone"]').type(12345678).should('have.value', 12345678)

        .get('[id="firstName"]').clear().should('have.value', '')
        .get('[id="lastName"]').clear().should('have.value', '')
        .get('[id="email"]').clear().should('have.value', '')
        .get('[id="phone"]').clear().should('have.value', '')
        
    });

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        
        cy.get('button[type="submit"]')
        .click()
        .get('[class="error"]')
        .should('be.visible')

    });

    it('Envia o formuário com sucesso usando um comando customizado', function(){
        
        cy.fillMandatoryFieldsAndSubmit()
        
        cy.get('[class="success"]').should('be.visible')
    });

    it('Seleciona um produto (YouTube) por seu texto', function(){

        cy.get('#product').select('YouTube')
          .should('have.value', 'youtube')

    })

    it('Seleciona um produto (Mentoria) por seu valor (value)', function(){

        cy.get('#product').select('mentoria')
          .should('have.value', 'mentoria')

    })

    it('Seleciona um produto (Blog) por seu índice', function(){

        cy.get('#product').select(1)
          .should('have.value', 'blog')

    })

    it('Marca o tipo de atendimento "Feedback"', function(){

      cy.get('input[type="radio"][value="elogio"]')
        .check()
        .should('have.value', 'elogio')
    })

    it('Marca cada tipo de atendimento', function(){

      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })      

    })

    it('Marca ambos checkboxes, depois desmarca o último', function(){

      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
        
    })

    it('Seleciona um arquivo da pasta fixtures', function(){

      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Seleciona um arquivo simulando um drag-and-drop', function(){

      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })

    })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){

      cy.fixture('example.json').as('exampleFile')
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('@exampleFile')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })

    })

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){

      cy.get('a[target="_blank"]')
        .should('have.attr', 'target' ,'_blank')

    })

    it('Acessa a página da política de privacidade removendo o target e então clicanco no link', function(){

      cy.get('a[target="_blank"]')
        .invoke('removeAttr', 'target')
        .click()

    })

  })