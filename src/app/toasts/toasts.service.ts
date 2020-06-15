import { Injectable, TemplateRef } from '@angular/core';


export interface Toast {
  textOrTpl: string | TemplateRef<any>;
  options?: {
    delay?: number;
    className?: string;
    header?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  toasts: Toast[] = [];

  show(textOrTpl: Toast['textOrTpl'], options?: Toast['options']) {
    this.toasts.push({ textOrTpl, options });
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
