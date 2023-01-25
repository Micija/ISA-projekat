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

describe('Ustanove e2e test', () => {
  const ustanovePageUrl = '/ustanove';
  const ustanovePageUrlPattern = new RegExp('/ustanove(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const ustanoveSample = { ime: 'Unbranded neural', adresa: 'Assurance', telefon: 'online Hu', email: 'Christophe.Pouros84@hotmail.com' };

  let ustanove;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/ustanoves+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/ustanoves').as('postEntityRequest');
    cy.intercept('DELETE', '/api/ustanoves/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (ustanove) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/ustanoves/${ustanove.id}`,
      }).then(() => {
        ustanove = undefined;
      });
    }
  });

  it('Ustanoves menu should load Ustanoves page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('ustanove');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Ustanove').should('exist');
    cy.url().should('match', ustanovePageUrlPattern);
  });

  describe('Ustanove page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(ustanovePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Ustanove page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/ustanove/new$'));
        cy.getEntityCreateUpdateHeading('Ustanove');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ustanovePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/ustanoves',
          body: ustanoveSample,
        }).then(({ body }) => {
          ustanove = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/ustanoves+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/ustanoves?page=0&size=20>; rel="last",<http://localhost/api/ustanoves?page=0&size=20>; rel="first"',
              },
              body: [ustanove],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(ustanovePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Ustanove page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('ustanove');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ustanovePageUrlPattern);
      });

      it('edit button click should load edit Ustanove page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Ustanove');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ustanovePageUrlPattern);
      });

      it('edit button click should load edit Ustanove page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Ustanove');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ustanovePageUrlPattern);
      });

      it('last delete button click should delete instance of Ustanove', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('ustanove').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ustanovePageUrlPattern);

        ustanove = undefined;
      });
    });
  });

  describe('new Ustanove page', () => {
    beforeEach(() => {
      cy.visit(`${ustanovePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Ustanove');
    });

    it('should create an instance of Ustanove', () => {
      cy.get(`[data-cy="ime"]`).type('paradigm open-source').should('have.value', 'paradigm open-source');

      cy.get(`[data-cy="adresa"]`).type('system-worthy 5th').should('have.value', 'system-worthy 5th');

      cy.get(`[data-cy="telefon"]`).type('synergyXX').should('have.value', 'synergyXX');

      cy.get(`[data-cy="email"]`).type('Janis_Rogahn@hotmail.com').should('have.value', 'Janis_Rogahn@hotmail.com');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        ustanove = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', ustanovePageUrlPattern);
    });
  });
});
