import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {Collapse} from '../../directives/Collapse/Collapse';
import {Accordion} from './Accordion';

@Component({
    selector: 'accordion-item, [accordion-item]',
    directives: [Collapse, NgClass],
    templateUrl: 'components/Accordion/AccordionItem.html'
})
export class AccordionItem implements OnInit, OnDestroy {
    @Input() heading:string;
    @Input() disabled:boolean = false;

    @Input()
    public get open():boolean {
        return this._open;
    }
    public set open(value:boolean) {
        this._open = value;
        if (value) {
            this.accordion.closeOtherItems(this);
        }
    }
    private _open:boolean = false;

    accordion:Accordion;
    
    @Output() openChange = new EventEmitter();

    public constructor(accordion:Accordion) {
        this.accordion = accordion;
    }

    public ngOnInit():any {
        this.accordion.addItem(this);
    }

    public ngOnDestroy():any {
        this.accordion.removeItem(this);
    }

    public toggleOpen(event:MouseEvent):any {
        event.preventDefault();
        if (!this.disabled) {
            this.open = !this.open;
            this.openChange.next(this.open);
        }
    }
}

export var ACCORDION_PROVIDERS = [
    Accordion,
    AccordionItem
];