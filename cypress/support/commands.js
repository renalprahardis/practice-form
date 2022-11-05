/// <reference types="Cypress" />
import 'cypress-file-upload';

Cypress.Commands.add('visitPage', () => {
  cy.visit('/');
});

Cypress.Commands.add('submitData', (data, caseField) => {

  // Name
  cy.get('#firstName').type(data.firstname);
  cy.get('#lastName').type(data.lastname);

  // Email
  if (caseField !== 'emailNull') {
    cy.get('#userEmail').type(data.email);
  }

  // Gender
  if (data.gender === 'Male') {
    cy.get('#genterWrapper > .col-md-9 > :nth-child(1)').click();
  } else if (data.gender === 'Female') {
    cy.get('#genterWrapper > .col-md-9 > :nth-child(2)').click();
  } else {
    cy.get('#genterWrapper > .col-md-9 > :nth-child(3)').click();
  }

  // Subject
  cy.get('.subjects-auto-complete__value-container').type(data.subject + '{enter}');

  // Mobile
  if (caseField !== 'mobileNull') {
    cy.get('#userNumber').click().type(data.mobile);
  }

  // Date of Birth
  cy.get('#dateOfBirthInput').type('{selectall}' + data.dateBirth);
  cy.contains('Student Registration Form').click();

  // Hobbies
  if (caseField !== 'hobbiesNull') {
    if (data.hobbies === 'Sports') {
      cy.get('#hobbiesWrapper > .col-md-9 > :nth-child(1)').click();
    } else if (data.hobbies === 'Reading') {
      cy.get('#hobbiesWrapper > .col-md-9 > :nth-child(2)').click();
    } else if (data.hobbies === 'Music') {
      cy.get('#hobbiesWrapper > .col-md-9 > :nth-child(3)').click();
    }
  }

  // Picture
  cy.get('input[type="file"]').attachFile(data.picture);

  // Current Address
  if (caseField !== 'currentAddresssNull') {
    cy.get('#currentAddress').type(data.currentAddress);
  }

  // State & City
  if (caseField !== 'stateCityNull') {
    cy.get('#state > .css-yk16xz-control > .css-1hwfws3').click();
    if (data.state === 'Rajasthan') {
      cy.contains('Rajasthan').click();
    } else if (data.state === 'NCR') {
      cy.contains('NCR').click();
    } else if (data.state === 'Uttar Pradesh') {
      cy.contains('Uttar Pradesh').click();
    } else if (data.state === 'Haryana') {
      cy.contains('Haryana').click();
    }

    cy.get('#city > .css-yk16xz-control > .css-1hwfws3').click();
    if (data.city === 'Jaipur') {
      cy.get('#react-select-4-option-0').click();
    } else if (data.city === 'Jaiselmar') {
      cy.contains('Jaiselmar').click();
    }
  }
  cy.get('#submit').click();
});

Cypress.Commands.add('expSuccessSubmit', () => {
  cy.get('.modal-body').should('exist');
  cy.contains('Thanks for submitting the form').should('be.visible');
});


Cypress.Commands.add('expFailedSubmit', () => {
  cy.get('.modal-body').should('not.exist');
  cy.contains('Thanks for submitting the form').should('not.exist');
});