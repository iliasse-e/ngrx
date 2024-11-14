import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'error',
  standalone: true,
  imports: [],
  template: `
  <p>{{message}}</p>
  `,
  styles: [`p { color: red}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent {

  @Input({required: true}) message!: string;

}
