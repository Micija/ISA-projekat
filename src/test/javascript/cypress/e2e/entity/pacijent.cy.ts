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

describe('Pacijent e2e test', () => {
  const pacijentPageUrl = '/pacijent';
  const pacijentPageUrlPattern = new RegExp('/pacijent(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const pacijentSample = {
    ime: 'cultivate',
    prezime: 'Kazakhstan Granite',
    jmbg: 'transparent I',
    adresa: 'bypass bypassing',
    telefon: 'matrix so',
    email: 'Kamren_Flatley@yahoo.com',
    datumRodjenja: '2023-01-24T08:54:08.380Z',
  };

  let pacijent;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/pacijents+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/pacijents').as('postEntityRequest');
    cy.intercept('DELETE', '/api/pacijents/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (pacijent) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/pacijents/${pacijent.id}`,
      }).then(() => {
        pacijent = undefined;
      });
    }
  });

  it('Pacijents menu should load Pacijents page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('pacijent');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Pacijent').should('exist');
    cy.url().should('match', pacijentPageUrlPattern);
  });

  describe('Pacijent page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(pacijentPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Pacijent page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/pacijent/new$'));
        cy.getEntityCreateUpdateHeading('Pacijent');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', pacijentPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/pacijents',
          body: pacijentSample,
        }).then(({ body }) => {
          pacijent = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/pacijents+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [pacijent],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(pacijentPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Pacijent page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('pacijent');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', pacijentPageUrlPattern);
      });

      it('edit button click should load edit Pacijent page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Pacijent');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', pacijentPageUrlPattern);
      });

      it('edit button click should load edit Pacijent page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Pacijent');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', pacijentPageUrlPattern);
      });

      it('last delete button click should delete instance of Pacijent', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('pacijent').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', pacijentPageUrlPattern);

        pacijent = undefined;
      });
    });
  });

  describe('new Pacijent page', () => {
    beforeEach(() => {
      cy.visit(`${pacijentPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Pacijent');
    });

    it('should create an instance of Pacijent', () => {
      cy.get(`[data-cy="ime"]`).type('capacitor Analyst unleash').should('have.value', 'capacitor Analyst unleash');

      cy.get(`[data-cy="prezime"]`).type('Granite ubiquitous Virgin').should('have.value', 'Granite ubiquitous Virgin');

      cy.get(`[data-cy="jmbg"]`).type('Ohio Account ').should('have.value', 'Ohio Account ');

      cy.get(`[data-cy="adresa"]`).type('Wooden').should('have.value', 'Wooden');

      cy.get(`[data-cy="telefon"]`).type('brandXXXX').should('have.value', 'brandXXXX');

      cy.get(`[data-cy="email"]`).type('Eulah.Ortiz52@hotmail.com').should('have.value', 'Eulah.Ortiz52@hotmail.com');

      cy.get(`[data-cy="datumRodjenja"]`).type('2023-01-23T23:29').blur().should('have.value', '2023-01-23T23:29');

      cy.get(`[data-cy="pol"]`).select('MUSKO');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        pacijent = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', pacijentPageUrlPattern);
    });
  });
});
