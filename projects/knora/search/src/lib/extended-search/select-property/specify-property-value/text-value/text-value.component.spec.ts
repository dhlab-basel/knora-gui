import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { KnoraApiConfigToken, KnoraApiConnectionToken, KuiCoreModule, ValueLiteral } from '@knora/core';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { KnoraApiConfig, KnoraApiConnection } from '@knora/api';

import { TextValueComponent } from './text-value.component';

/**
 * Test host component to simulate parent component.
 */
@Component({
    selector: `kui-host-component`,
    template: `
        <text-value #textVal [formGroup]="form"></text-value>`
})
class TestHostComponent implements OnInit {

    form;

    @ViewChild('textVal', { static: false }) textValue: TextValueComponent;

    constructor(@Inject(FormBuilder) private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.fb.group({});

    }
}

describe('TextValueComponent', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    const config = new KnoraApiConfig('http', '0.0.0.0', 3333);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TextValueComponent,
                TestHostComponent
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatIconModule,
                MatCheckboxModule,
                BrowserAnimationsModule,
                MatInputModule,
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
        expect(testHostComponent.textValue).toBeTruthy();
    });

    it('should get a text literal of test', () => {
        // access the test host component's child
        expect(testHostComponent.textValue).toBeTruthy();

        const hostCompDe = testHostFixture.debugElement;

        const textLiteralVal = new ValueLiteral('test', 'http://www.w3.org/2001/XMLSchema#string');

        const textVal = hostCompDe.query(By.directive(TextValueComponent));

        const matInput = textVal.query(By.css('input'));

        matInput.nativeElement.value = 'test';

        matInput.triggerEventHandler('input', { target: matInput.nativeElement });

        testHostFixture.detectChanges();

        expect(testHostComponent.textValue.getValue()).toEqual(textLiteralVal);

    });
});
