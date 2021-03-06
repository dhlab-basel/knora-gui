import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, DebugElement, Inject, OnInit, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Cardinality, CardinalityOccurrence, GuiOrder, KnoraApiConfigToken, KnoraApiConnectionToken, KuiCoreModule, ResourceClass } from '@knora/core';
import { KnoraApiConfig, KnoraApiConnection } from '@knora/api';

import { SelectResourceClassComponent } from './select-resource-class.component';

// resource classes passed to `SelectResourceClass` from parent component
const initResClasses = [
    new ResourceClass(
        'http://0.0.0.0:3333/ontology/0001/anything/v2#BlueThing',
        'blueting.png',
        'A blue thing.',
        'blue thing',
        [
            new Cardinality(
                CardinalityOccurrence.minCard,
                0,
                'http://0.0.0.0:3333/ontology/0001/anything/v2#hasText'
            ),
            new Cardinality(
                CardinalityOccurrence.card,
                1,
                'http://api.knora.org/ontology/knora-api/v2#attachedToProject'
            ),
            new Cardinality(
                CardinalityOccurrence.card,
                1,
                'http://api.knora.org/ontology/knora-api/v2#attachedToUser'
            ),
            new Cardinality(
                CardinalityOccurrence.card,
                1,
                'http://api.knora.org/ontology/knora-api/v2#creationDate'
            ),
            new Cardinality(
                CardinalityOccurrence.card,
                1,
                'http://api.knora.org/ontology/knora-api/v2#hasIncomingLinkValue'
            ),
            new Cardinality(
                CardinalityOccurrence.card,
                1,
                'http://api.knora.org/ontology/knora-api/v2#hasIncomingLinkValue'
            ),
            new Cardinality(
                CardinalityOccurrence.card,
                1,
                'http://api.knora.org/ontology/knora-api/v2#hasPermissions'
            ),
            new Cardinality(
                CardinalityOccurrence.card,
                1,
                'http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo'
            ),
            new Cardinality(
                CardinalityOccurrence.card,
                1,
                'http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue'
            ),
            new Cardinality(
                CardinalityOccurrence.card,
                1,
                'http://api.knora.org/ontology/knora-api/v2#lastModificationDate'
            )
        ],
        [
            new GuiOrder(
                2,
                'http://0.0.0.0:3333/ontology/0001/anything/v2#hasText'
            ),
        ]
    )
];

const updatedResClasses = [
    new ResourceClass(
        'http://0.0.0.0:3333/ontology/0001/anything/v2#RedThing',
        'blueting.png',
        'A blue thing.',
        'blue thing',
        [
            new Cardinality(
                CardinalityOccurrence.minCard,
                0,
                'http://0.0.0.0:3333/ontology/0001/anything/v2#hasText'
            ),
            new Cardinality(
                CardinalityOccurrence.card,
                1,
                'http://api.knora.org/ontology/knora-api/v2#attachedToProject'
            ),
            new Cardinality(
                CardinalityOccurrence.card,
                1,
                'http://api.knora.org/ontology/knora-api/v2#attachedToUser'
            ),
            new Cardinality(
                CardinalityOccurrence.card,
                1,
                'http://api.knora.org/ontology/knora-api/v2#creationDate'
            ),
            new Cardinality(
                CardinalityOccurrence.card,
                1,
                'http://api.knora.org/ontology/knora-api/v2#hasIncomingLinkValue'
            ),
            new Cardinality(
                CardinalityOccurrence.card,
                1,
                'http://api.knora.org/ontology/knora-api/v2#hasIncomingLinkValue'
            ),
            new Cardinality(
                CardinalityOccurrence.card,
                1,
                'http://api.knora.org/ontology/knora-api/v2#hasPermissions'
            ),
            new Cardinality(
                CardinalityOccurrence.card,
                1,
                'http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo'
            ),
            new Cardinality(
                CardinalityOccurrence.card,
                1,
                'http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue'
            ),
            new Cardinality(
                CardinalityOccurrence.card,
                1,
                'http://api.knora.org/ontology/knora-api/v2#lastModificationDate'
            )
        ],
        [
            new GuiOrder(
                2,
                'http://0.0.0.0:3333/ontology/0001/anything/v2#hasText'
            ),
        ]
    )
];

/**
 * Test host component to simulate `ExtendedSearchComponent`.
 */
@Component({
    selector: `kui-host-component`,
    template: `
        <kui-select-resource-class #resClass [formGroup]="form" [resourceClasses]="resClasses"
                                   (resourceClassSelectedEvent)="getPropertiesForResourceClass($event)"></kui-select-resource-class>`
})
class TestHostComponent implements OnInit {

    form;

    resClasses: Array<ResourceClass> = [];

    selectedResClass: string;

    @ViewChild('resClass', { static: false }) selectResClassesComp: SelectResourceClassComponent;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {
    }

    getPropertiesForResourceClass(resClassIri) {
        this.selectedResClass = resClassIri;
    }

    ngOnInit() {
        this.form = this.fb.group({});

        this.resClasses = initResClasses;
    }

}

describe('SelectResourceClassComponent', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    const config = new KnoraApiConfig('http', '0.0.0.0', 3333);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SelectResourceClassComponent,
                TestHostComponent
            ],
            imports: [
                HttpClientTestingModule,
                FormsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatSelectModule,
                MatIconModule,
                MatCheckboxModule,
                MatDatepickerModule,
                MatAutocompleteModule,
                BrowserAnimationsModule,
                RouterTestingModule.withRoutes([]),
                KuiCoreModule
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: null
                    },
                },
                {
                    provide: KnoraApiConfigToken,
                    useValue: config
                },
                {
                    provide: KnoraApiConnectionToken,
                    useValue: new KnoraApiConnection(config)
                },
                FormBuilder
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
        testHostFixture.detectChanges();

        expect(testHostComponent).toBeTruthy();

    });

    it('should create', () => {
        // access the test host component's child
        expect(testHostComponent.selectResClassesComp).toBeTruthy();
    });

    it('should initialize the ontologies', () => {
        // access the test host component's child
        expect(testHostComponent.selectResClassesComp).toBeTruthy();

        const selectResClassCompInstance = testHostComponent.selectResClassesComp;

        expect(selectResClassCompInstance.resourceClasses).toEqual(initResClasses);

    });

    it('should create the selection for the resource classes', () => {

        // access the test host component's child
        expect(testHostComponent.selectResClassesComp).toBeTruthy();

        const hostCompDe = testHostFixture.debugElement;

        const selResClasses = hostCompDe.query(By.directive(SelectResourceClassComponent));

        const matSelect = selResClasses.query(By.css('mat-select'));

        matSelect.nativeElement.click();

        testHostFixture.detectChanges();

        const options: DebugElement[] = matSelect.queryAll(By.css('mat-option'));

        // make sure that there are two mat-option (one for no selection)
        expect(options.length).toEqual(2);
    });

    it('should select a resource class', () => {

        // access the test host component's child
        expect(testHostComponent.selectResClassesComp).toBeTruthy();

        const hostCompDe = testHostFixture.debugElement;

        const selResClasses = hostCompDe.query(By.directive(SelectResourceClassComponent));

        const matSelect = selResClasses.query(By.css('mat-select'));

        matSelect.nativeElement.click();

        testHostFixture.detectChanges();

        const options: DebugElement[] = matSelect.queryAll(By.css('mat-option'));

        matSelect.nativeElement.click();

        testHostFixture.detectChanges();

        (options[1].nativeElement as HTMLElement).click();

        testHostFixture.detectChanges();

        // make sure that the selected resource class's Iri was correctly emitted to the parent component
        expect(testHostComponent.selectedResClass).toEqual('http://0.0.0.0:3333/ontology/0001/anything/v2#BlueThing');
    });

    it('should select option "no selection"', () => {

        // access the test host component's child
        expect(testHostComponent.selectResClassesComp).toBeTruthy();

        const hostCompDe = testHostFixture.debugElement;

        const selResClasses = hostCompDe.query(By.directive(SelectResourceClassComponent));

        const matSelect = selResClasses.query(By.css('mat-select'));

        matSelect.nativeElement.click();

        testHostFixture.detectChanges();

        const options: DebugElement[] = matSelect.queryAll(By.css('mat-option'));

        matSelect.nativeElement.click();

        testHostFixture.detectChanges();

        (options[0].nativeElement as HTMLElement).click();

        testHostFixture.detectChanges();

        // make sure that the "no selection" was correctly emitted to the parent component
        expect(testHostComponent.selectedResClass).toEqual(null);
    });

    it('should update the resource classes through the input', () => {

        testHostComponent.resClasses = updatedResClasses;

        testHostFixture.detectChanges();

        expect(testHostComponent.selectResClassesComp.resourceClasses).toEqual(updatedResClasses);

    });


});
