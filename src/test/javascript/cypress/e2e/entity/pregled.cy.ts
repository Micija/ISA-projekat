import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Pregled e2e test', () => {
  const pregledPageUrl = '/pregled';
  const pregledPageUrlPattern = new RegExp('/pregled(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const pregledSample = { ime: 'invoice Communications' };

  let pregled;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/pregleds+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/pregleds').as('postEntityRequest');
    cy.intercept('DELETE', '/api/pregleds/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (pregled) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/pregleds/${pregled.id}`,
      }).then(() => {
        pregled = undefined;
      });
    }
  });

  it('Pregleds menu should load Pregleds page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('pregled');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Pregled').should('exist');
    cy.url().should('match', pregledPageUrlPattern);
  });

  describe('Pregled page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(pregledPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Pregled page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/pregled/new$'));
        cy.getEntityCreateUpdateHeading('Pregled');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', pregledPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/pregleds',
          body: pregledSample,
        }).then(({ body }) => {
          pregled = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/pregleds+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/pregleds?page=0&size=20>; rel="last",<http://localhost/api/pregleds?page=0&size=20>; rel="first"',
              },
              body: [pregled],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(pregledPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Pregled page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('pregled');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', pregledPageUrlPattern);
      });

      it('edit button click should load edit Pregled page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Pregled');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', pregledPageUrlPattern);
      });

      it('edit button click should load edit Pregled page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Pregled');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', pregledPageUrlPattern);
      });

      it('last delete button click should delete instance of Pregled', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('pregled').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', pregledPageUrlPattern);

        pregled = undefined;
      });
    });
  });

  describe('new Pregled page', () => {
    beforeEach(() => {
      cy.visit(`${pregledPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Pregled');
    });

    it('should create an instance of Pregled', () => {
      cy.get(`[data-cy="ime"]`).type('blockchains program harness').should('have.value', 'blockchains program harness');

      cy.get(`[data-cy="tip"]`).select('REDOVAN');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        pregled = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', pregledPageUrlPattern);
    });
  });
});
