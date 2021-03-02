import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'bypassSanitizer'
})
export class BypassSanitizerPipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) { }

  public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
      case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
      default: throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}
