import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPregled } from '../pregled.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../pregled.test-samples';

import { PregledService } from './pregled.service';

const requireRestSample: IPregled = {
  ...sampleWithRequiredData,
};

describe('Pregled Service', () => {
  let service: PregledService;
  let httpMock: HttpTestingController;
  let expectedResult: IPregled | IPregled[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PregledService);
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

    it('should create a Pregled', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const pregled = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(pregled).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Pregled', () => {
      const pregled = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(pregled).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Pregled', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Pregled', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Pregled', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPregledToCollectionIfMissing', () => {
      it('should add a Pregled to an empty array', () => {
        const pregled: IPregled = sampleWithRequiredData;
        expectedResult = service.addPregledToCollectionIfMissing([], pregled);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pregled);
      });

      it('should not add a Pregled to an array that contains it', () => {
        const pregled: IPregled = sampleWithRequiredData;
        const pregledCollection: IPregled[] = [
          {
            ...pregled,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPregledToCollectionIfMissing(pregledCollection, pregled);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Pregled to an array that doesn't contain it", () => {
        const pregled: IPregled = sampleWithRequiredData;
        const pregledCollection: IPregled[] = [sampleWithPartialData];
        expectedResult = service.addPregledToCollectionIfMissing(pregledCollection, pregled);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pregled);
      });

      it('should add only unique Pregled to an array', () => {
        const pregledArray: IPregled[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const pregledCollection: IPregled[] = [sampleWithRequiredData];
        expectedResult = service.addPregledToCollectionIfMissing(pregledCollection, ...pregledArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const pregled: IPregled = sampleWithRequiredData;
        const pregled2: IPregled = sampleWithPartialData;
        expectedResult = service.addPregledToCollectionIfMissing([], pregled, pregled2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pregled);
        expect(expectedResult).toContain(pregled2);
      });

      it('should accept null and undefined values', () => {
        const pregled: IPregled = sampleWithRequiredData;
        expectedResult = service.addPregledToCollectionIfMissing([], null, pregled, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pregled);
      });

      it('should return initial array if no Pregled is added', () => {
        const pregledCollection: IPregled[] = [sampleWithRequiredData];
        expectedResult = service.addPregledToCollectionIfMissing(pregledCollection, undefined, null);
        expect(expectedResult).toEqual(pregledCollection);
      });
    });

    describe('comparePregled', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePregled(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePregled(entity1, entity2);
        const compareResult2 = service.comparePregled(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePregled(entity1, entity2);
        const compareResult2 = service.comparePregled(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePregled(entity1, entity2);
        const compareResult2 = service.comparePregled(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
