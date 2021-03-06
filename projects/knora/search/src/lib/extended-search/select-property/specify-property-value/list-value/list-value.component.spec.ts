import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { KnoraApiConfig, KnoraApiConnection } from '@knora/api';
import { IRI, KnoraApiConfigToken, KnoraApiConnectionToken, KuiCoreModule, Property } from '@knora/core';

import { ListDisplayComponent } from './list-display/list-display.component';
import { ListValueComponent } from './list-value.component';

/**
 * Test host component to simulate parent component.
 */
@Component({
    selector: `kui-host-component`,
    template: `<list-value #listVal [formGroup]="form" [property]="property"></list-value>`
})
class TestHostComponent implements OnInit {

    form;
    property: Property;

    @ViewChild('listVal', { static: false }) listValue: ListValueComponent;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.fb.group({});

        this.property = new Property(
            'http://0.0.0.0:3333/ontology/0001/anything/v2#hasListItem',
            'http://api.knora.org/ontology/knora-api/v2#ListValue',
            undefined,
            'Text',
            ['http://api.knora.org/ontology/knora-api/v2#hasValue'],
            true,
            false,
            false,
            ['hlist=<http://rdfh.ch/lists/0001/treeList>']
        );
    }
}

xdescribe('ListValueComponent', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    let spyListCacheService;

    const config = new KnoraApiConfig('http', '0.0.0.0', 3333);

    beforeEach(async(() => {

        spyListCacheService = jasmine.createSpyObj('ListCacheService', ['getList']);

        TestBed.configureTestingModule({
            declarations: [
                ListValueComponent,
                TestHostComponent,
                ListDisplayComponent
            ],
            imports: [
                HttpClientTestingModule,
                FormsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatIconModule,
                MatCheckboxModule,
                BrowserAnimationsModule,
                MatInputModule,
                MatMenuModule,
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

        // const testList = new ListNodeV2(
        //     'http://rdfh.ch/lists/0001/treeList',
        //     'tree list'
        // );

        // testList.children.push(new ListNodeV2(
        //     'http://rdfh.ch/lists/0001/treeList/01',
        //     'tree list 01',
        //     1,
        //     'http://rdfh.ch/lists/0001/treeList'
        // ));

        // spyListCacheService.getList.and.returnValue(of(testList));

    }));

    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
        testHostFixture.detectChanges();

        expect(testHostComponent).toBeTruthy();
    });

    it('should create', () => {
        // access the test host component's child
        expect(testHostComponent.listValue).toBeTruthy();
    });

    xit('should have called ListCacheService\'s getList method', () => {
        // const listCacheService = TestBed.get(ListCacheService);

        // expect(listCacheService.getList).toHaveBeenCalledTimes(1);
        // expect(listCacheService.getList).toHaveBeenCalledWith('http://rdfh.ch/lists/0001/treeList');
    });

    it('should get the selected list node', () => {

        testHostComponent.listValue.form.setValue({ 'listValue': 'http://rdfh.ch/lists/0001/treeList/01' });

        const expectedListNode = new IRI('http://rdfh.ch/lists/0001/treeList/01');

        const listNode = testHostComponent.listValue.getValue();

        expect(listNode).toEqual(expectedListNode);

    });
});
