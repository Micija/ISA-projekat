import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPacijent } from '../pacijent.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../pacijent.test-samples';

import { PacijentService, RestPacijent } from './pacijent.service';

const requireRestSample: RestPacijent = {
  ...sampleWithRequiredData,
  datumRodjenja: sampleWithRequiredData.datumRodjenja?.toJSON(),
};

describe('Pacijent Service', () => {
  let service: PacijentService;
  let httpMock: HttpTestingController;
  let expectedResult: IPacijent | IPacijent[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PacijentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Pacijent', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const pacijent = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(pacijent).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Pacijent', () => {
      const pacijent = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(pacijent).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Pacijent', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Pacijent', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Pacijent', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPacijentToCollectionIfMissing', () => {
      it('should add a Pacijent to an empty array', () => {
        const pacijent: IPacijent = sampleWithRequiredData;
        expectedResult = service.addPacijentToCollectionIfMissing([], pacijent);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pacijent);
      });

      it('should not add a Pacijent to an array that contains it', () => {
        const pacijent: IPacijent = sampleWithRequiredData;
        const pacijentCollection: IPacijent[] = [
          {
            ...pacijent,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPacijentToCollectionIfMissing(pacijentCollection, pacijent);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Pacijent to an array that doesn't contain it", () => {
        const pacijent: IPacijent = sampleWithRequiredData;
        const pacijentCollection: IPacijent[] = [sampleWithPartialData];
        expectedResult = service.addPacijentToCollectionIfMissing(pacijentCollection, pacijent);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pacijent);
      });

      it('should add only unique Pacijent to an array', () => {
        const pacijentArray: IPacijent[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const pacijentCollection: IPacijent[] = [sampleWithRequiredData];
        expectedResult = service.addPacijentToCollectionIfMissing(pacijentCollection, ...pacijentArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const pacijent: IPacijent = sampleWithRequiredData;
        const pacijent2: IPacijent = sampleWithPartialData;
        expectedResult = service.addPacijentToCollectionIfMissing([], pacijent, pacijent2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pacijent);
        expect(expectedResult).toContain(pacijent2);
      });

      it('should accept null and undefined values', () => {
        const pacijent: IPacijent = sampleWithRequiredData;
        expectedResult = service.addPacijentToCollectionIfMissing([], null, pacijent, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pacijent);
      });

      it('should return initial array if no Pacijent is added', () => {
        const pacijentCollection: IPacijent[] = [sampleWithRequiredData];
        expectedResult = service.addPacijentToCollectionIfMissing(pacijentCollection, undefined, null);
        expect(expectedResult).toEqual(pacijentCollection);
      });
    });

    describe('comparePacijent', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePacijent(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePacijent(entity1, entity2);
        const compareResult2 = service.comparePacijent(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePacijent(entity1, entity2);
        const compareResult2 = service.comparePacijent(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePacijent(entity1, entity2);
        const compareResult2 = service.comparePacijent(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
