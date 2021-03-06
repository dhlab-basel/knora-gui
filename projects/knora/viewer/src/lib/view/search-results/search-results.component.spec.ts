import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { KnoraApiConfig, KnoraApiConnection } from '@knora/api';
import { KnoraApiConnectionToken, KuiCoreModule } from '@knora/core';
import { KuiActionModule } from 'projects/knora/action/src/public_api';
import { of } from 'rxjs';

import { DateValueComponent } from '../../property/date-value/date-value.component';
import { TextValueAsHtmlComponent } from '../../property/text-value/text-value-as-html/text-value-as-html.component';
import { GridViewComponent } from '../list/grid-view/grid-view.component';
import { ListViewComponent } from '../list/list-view/list-view.component';
import { TableViewComponent } from '../list/table-view/table-view.component';

import { SearchResultsComponent } from './search-results.component';

// OUTDATED CLASS
// TODO: will be removed because the logic has been moved to the knora/api lib

/* class MockSearchParamsService {

    private _currentSearchParams: BehaviorSubject<any>;

    constructor() {
        this._currentSearchParams = new BehaviorSubject<ExtendedSearchParams>(new ExtendedSearchParams((offset: number) => 'testquery' + offset));
    }

    changeSearchParamsMsg(searchParams: ExtendedSearchParams): void {
        this._currentSearchParams.next(searchParams);
    }

    getSearchParams(): ExtendedSearchParams {
        return this._currentSearchParams.getValue();
    }
} */

// TODO: the tests have been temporarily excluded because it requires new test data from the MockFactory and classes from @knora/api lib

describe('SearchResultsComponent', () => {
    let component: SearchResultsComponent;
    let fixture: ComponentFixture<SearchResultsComponent>;

    let mode: string; // search mode = extended or fulltext
    let project; // project iri
    const q = 'test'; // query terms

    // let mockSearchParamService;
    // let searchServiceSpy: jasmine.SpyObj<SearchService>; // see https://angular.io/guide/testing#angular-testbed

    const config = new KnoraApiConfig('http', '0.0.0.0', 3333);

    beforeEach(async(() => {
        // mockSearchParamService = new MockSearchParamsService();
        const spySearchService =
            jasmine.createSpyObj('SearchService',
                ['doExtendedSearchCountQueryCountQueryResult',
                    'doExtendedSearchReadResourceSequence',
                    'doFullTextSearchReadResourceSequence',
                    'doFullTextSearchCountQueryCountQueryResult']);

        TestBed.configureTestingModule({
            imports: [
                KuiActionModule,
                MatCardModule,
                MatIconModule,
                MatListModule,
                MatPaginatorModule,
                MatTabsModule,
                HttpClientModule,
                HttpClientTestingModule,
                RouterTestingModule,
                KuiCoreModule
            ],
            declarations: [
                DateValueComponent,
                ListViewComponent,
                SearchResultsComponent,
                TextValueAsHtmlComponent,
                GridViewComponent,
                TableViewComponent
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of({
                            get: (param: string) => {
                                if (param === 'q') {
                                    return q;
                                } else if (param === 'project') {
                                    if (project !== undefined) {
                                        return project;
                                    } else {
                                        return null;
                                    }
                                } else {
                                    return mode;
                                }
                            }
                        })
                    }
                },
                {
                    provide: KnoraApiConnectionToken,
                    useValue: new KnoraApiConnection(config)
                }
                // HttpClient
            ]
        }).compileComponents();

        // searchServiceSpy = TestBed.get(SearchService);

        // Extended search mock

        /* searchServiceSpy.doExtendedSearchCountQueryCountQueryResult.and.callFake((gravsearch: string) => {

            const countQueryRes = new CountQueryResult(1);

            return of(
                countQueryRes
            );
        });

        searchServiceSpy.doExtendedSearchReadResourceSequence.and.callFake(() => {

            const things = require('../../../../../core/src/lib/test-data/resources/Testthing-expanded.json'); // mock response

            // const thingsSeq = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(things);

            const resClasses: ResourceClasses = require('../../../../../core/src/lib/test-data/ontologyinformation/thing-resource-classes.json');
            const properties: Properties = require('../../../../../core/src/lib/test-data/ontologyinformation/thing-properties.json');

            const ontoInfo = new OntologyInformation({}, resClasses, properties);

            thingsSeq.ontologyInformation.updateOntologyInformation(ontoInfo);

            return of(
                thingsSeq
            );
        }); */

        // Fulltext search mock

        /* searchServiceSpy.doFullTextSearchCountQueryCountQueryResult.and.callFake((searchTerm: string) => {

            const countQueryRes = new CountQueryResult(1);

            return of(
                countQueryRes
            );
        });

        searchServiceSpy.doFullTextSearchReadResourceSequence.and.callFake(() => {

            const things = require('../../../../../core/src/lib/test-data/resources/Testthing-expanded.json'); // mock response

            const thingsSeq = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(things);

            const resClasses: ResourceClasses = require('../../../../../core/src/lib/test-data/ontologyinformation/thing-resource-classes.json');
            const properties: Properties = require('../../../../../core/src/lib/test-data/ontologyinformation/thing-properties.json');

            const ontoInfo = new OntologyInformation({}, resClasses, properties);

            thingsSeq.ontologyInformation.updateOntologyInformation(ontoInfo);

            return of(
                thingsSeq
            );
        }); */

    }));

    // TODO: the tests have been temporarily excluded because it requires new test data from the MockFactory and classes from @knora/api lib

    describe('extended search', () => {
        beforeEach(() => {
            mode = 'extended';
            fixture = TestBed.createComponent(SearchResultsComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        /* it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should perform a count query', () => {

            component.ngOnChanges();

            expect(searchServiceSpy.doExtendedSearchCountQueryCountQueryResult).toHaveBeenCalledTimes(1);

            expect(searchServiceSpy.doExtendedSearchCountQueryCountQueryResult).toHaveBeenCalledWith('testquery0');

            expect(component.numberOfAllResults).toEqual(1);
        });

        it('should perform a gravsearch query', () => {

            component.ngOnChanges();

            expect(searchServiceSpy.doExtendedSearchReadResourceSequence).toHaveBeenCalledTimes(1);

            expect(searchServiceSpy.doExtendedSearchReadResourceSequence).toHaveBeenCalledWith('testquery0');

            expect(component.result.length).toEqual(1);
        }); */
    });

    describe('fulltext search without a project', () => {
        beforeEach(() => {
            mode = 'fulltext';
            fixture = TestBed.createComponent(SearchResultsComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        /* it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should perform a count query', () => {

            component.ngOnChanges();

            expect(searchServiceSpy.doFullTextSearchCountQueryCountQueryResult).toHaveBeenCalledTimes(1);

            expect(searchServiceSpy.doFullTextSearchCountQueryCountQueryResult).toHaveBeenCalledWith('test', undefined);

            expect(component.numberOfAllResults).toEqual(1);
        });

        it('should perform a fulltext query', () => {

            component.ngOnChanges();

            expect(searchServiceSpy.doFullTextSearchReadResourceSequence).toHaveBeenCalledTimes(1);

            expect(searchServiceSpy.doFullTextSearchReadResourceSequence).toHaveBeenCalledWith('test', 0, undefined);

            expect(component.result.length).toEqual(1);
        }); */
    });

    describe('fulltext search with a project', () => {
        beforeEach(() => {
            mode = 'fulltext';
            project = 'http://rdfh.ch/projects/0001';
            fixture = TestBed.createComponent(SearchResultsComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        /* it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should perform a count query', () => {

            component.ngOnChanges();

            expect(searchServiceSpy.doFullTextSearchCountQueryCountQueryResult).toHaveBeenCalledTimes(1);

            expect(searchServiceSpy.doFullTextSearchCountQueryCountQueryResult).toHaveBeenCalledWith('test', { limitToProject: 'http://rdfh.ch/projects/0001' });

            expect(component.numberOfAllResults).toEqual(1);
        });

        it('should perform a fulltext query', () => {

            component.ngOnChanges();

            expect(searchServiceSpy.doFullTextSearchReadResourceSequence).toHaveBeenCalledTimes(1);

            expect(searchServiceSpy.doFullTextSearchReadResourceSequence).toHaveBeenCalledWith('test', 0, { limitToProject: 'http://rdfh.ch/projects/0001' });

            expect(component.result.length).toEqual(1);
        }); */
    });
});
