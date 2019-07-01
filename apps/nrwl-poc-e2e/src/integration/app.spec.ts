import { getGreeting } from '../support/app.po';

describe('nrwl-poc', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to nrwl-poc!');
  });
});
