import { Injectable, ApplicationRef, ComponentRef, createComponent, EnvironmentInjector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalRef: ComponentRef<any> | null = null;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  open(component: any): ComponentRef<any> {
    this.close(); // Cierra cualquier modal abierto

    // Crea el componente dinámicamente
    this.modalRef = createComponent(component, {
      environmentInjector: this.injector
    });

    // Agrega al DOM
    document.body.appendChild(this.modalRef.location.nativeElement);

    // Registra para detección de cambios
    this.appRef.attachView(this.modalRef.hostView);

    // Maneja el cierre automático
    this.modalRef.instance.closed.subscribe(() => {
      this.close();
    });

    return this.modalRef;
  }

  close(): void {
    if (this.modalRef) {
      this.appRef.detachView(this.modalRef.hostView);
      this.modalRef.destroy();
      this.modalRef = null;
    }
  }
}
