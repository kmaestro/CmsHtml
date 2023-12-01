import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkDrag, CdkDragDrop, CdkDragMove, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, CdkDrag],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {

  onDragMoved(event: CdkDragMove): void {
    const { x, y } = event.source.getFreeDragPosition();
    event.source.element.nativeElement.style.transform = `translate(${x}px, ${y}px)`;
  }
}
