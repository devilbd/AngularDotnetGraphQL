import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-window-box',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './window-box.component.html',
    styleUrl: './window-box.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class WindowBoxComponent implements OnInit, OnDestroy{
    public isVisible = false;

    private coverPlane!: HTMLElement;

    constructor(private changeDetectionRef: ChangeDetectorRef, private elementRef: ElementRef) {

    }

    ngOnInit(): void {
        this.moveToBody();
        this.constructCoverPlane();
    }

    ngOnDestroy(): void {

    }

    show() {
        this.isVisible = true;
        this.showCoverPlane();
        this.changeDetectionRef.detectChanges();
    }

    hide() {
        this.isVisible = false;
        this.hideCoverPlane();
        this.changeDetectionRef.detectChanges();
    }

    moveToBody() {
        const body = document.querySelector('body');
        const parentElement = this.elementRef.nativeElement.parentElement;
        parentElement.removeChild(this.elementRef.nativeElement);
        body?.appendChild(this.elementRef.nativeElement);
    }

    constructCoverPlane() {
        const body = document.querySelector('body');
        this.coverPlane = document.createElement('div');
        this.coverPlane.classList.add("window-box-cover-plane");
        body?.appendChild(this.coverPlane);
    }

    private showCoverPlane() {
        this.coverPlane.classList.add('visible');
    }

    private hideCoverPlane() {
        this.coverPlane.classList.remove('visible');
    }
}
