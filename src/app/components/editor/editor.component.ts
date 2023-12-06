import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomSanitizer} from "@angular/platform-browser";
import {PanelComponent} from "../panel/panel.component";

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit, AfterViewInit {
  iframeSrc: string;
  @ViewChild('iframe', {static: true}) iframe: ElementRef<HTMLIFrameElement>;


  constructor(private sanitizer: DomSanitizer) {
    this.iframeSrc = '../index.html';
  }

  ngOnInit(): void {
    this.iframe.nativeElement.src = this.iframeSrc;
  }

  ngAfterViewInit(): void {
    if (this.iframe.nativeElement.contentDocument) {
      setTimeout(() => {

        let body = this.iframe.nativeElement.contentDocument.body;
        let textNodes = [];

        function recursy(element) {
          element.childNodes.forEach(node => {

            if (node.nodeName === "#text" && node.nodeValue.replace(/\s+/g, "").length > 0) {
              textNodes.push(node);
            } else {
              recursy(node);
            }
          })
        }

        recursy(body);

        textNodes.forEach(node => {
          const wrapper = this.iframe.nativeElement.contentDocument.createElement('text-editor');
          node.parentNode.replaceChild(wrapper, node);
          wrapper.appendChild(node);
          wrapper.contentEditable = "true";
        });
        console.log(body.innerHTML, this.iframe.nativeElement.contentDocument.body, textNodes);
      }, 1000);
    }
  }
}
