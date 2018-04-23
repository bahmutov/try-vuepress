/// <reference types="cypress" />
import {title} from '../../src/.vuepress/config'

describe('VuePress site', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('loads', () => {
    cy.contains('h1', 'Hello VuePress').should('be.visible')
  })
  it('goes to About page and back', () => {
    cy.contains('.next', 'About').click()
    cy.url().should('contain', 'about.html')
    cy.go('back')
    cy.url().should('equal', Cypress.config('baseUrl') + '/')
  })
  it('finds the about page', () => {
    cy.get('.search-box input').type('about')
    cy.get('.suggestions').find('li')
      .should('be.visible')
      .and('have.length.gte', 1)
      .first()
      .contains('.page-title', 'About')
      .click()
    cy.title().should('equal', `${title} | About`)
  })
})
