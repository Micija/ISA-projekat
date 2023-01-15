import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IUstanove } from '../ustanove.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../ustanove.test-samples';

import { UstanoveService } from './ustanove.service';

const requireRestSample: IUstanove = {
  ...sampleWithRequiredData,
};

describe('Ustanove Service', () => {
  let service: UstanoveService;
  let httpMock: HttpTestingController;
  let expectedResult: IUstanove | IUstanove[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(UstanoveService);
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

    it('should create a Ustanove', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ustanove = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(ustanove).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Ustanove', () => {
      const ustanove = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(ustanove).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Ustanove', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Ustanove', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Ustanove', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addUstanoveToCollectionIfMissing', () => {
      it('should add a Ustanove to an empty array', () => {
        const ustanove: IUstanove = sampleWithRequiredData;
        expectedResult = service.addUstanoveToCollectionIfMissing([], ustanove);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ustanove);
      });

      it('should not add a Ustanove to an array that contains it', () => {
        const ustanove: IUstanove = sampleWithRequiredData;
        const ustanoveCollection: IUstanove[] = [
          {
            ...ustanove,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addUstanoveToCollectionIfMissing(ustanoveCollection, ustanove);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Ustanove to an array that doesn't contain it", () => {
        const ustanove: IUstanove = sampleWithRequiredData;
        const ustanoveCollection: IUstanove[] = [sampleWithPartialData];
        expectedResult = service.addUstanoveToCollectionIfMissing(ustanoveCollection, ustanove);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ustanove);
      });

      it('should add only unique Ustanove to an array', () => {
        const ustanoveArray: IUstanove[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const ustanoveCollection: IUstanove[] = [sampleWithRequiredData];
        expectedResult = service.addUstanoveToCollectionIfMissing(ustanoveCollection, ...ustanoveArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const ustanove: IUstanove = sampleWithRequiredData;
        const ustanove2: IUstanove = sampleWithPartialData;
        expectedResult = service.addUstanoveToCollectionIfMissing([], ustanove, ustanove2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ustanove);
        expect(expectedResult).toContain(ustanove2);
      });

      it('should accept null and undefined values', () => {
        const ustanove: IUstanove = sampleWithRequiredData;
        expectedResult = service.addUstanoveToCollectionIfMissing([], null, ustanove, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ustanove);
      });

      it('should return initial array if no Ustanove is added', () => {
        const ustanoveCollection: IUstanove[] = [sampleWithRequiredData];
        expectedResult = service.addUstanoveToCollectionIfMissing(ustanoveCollection, undefined, null);
        expect(expectedResult).toEqual(ustanoveCollection);
      });
    });

    describe('compareUstanove', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareUstanove(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareUstanove(entity1, entity2);
        const compareResult2 = service.compareUstanove(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareUstanove(entity1, entity2);
        const compareResult2 = service.compareUstanove(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareUstanove(entity1, entity2);
        const compareResult2 = service.compareUstanove(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
