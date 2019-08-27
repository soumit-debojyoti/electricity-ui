import { Pipe, PipeTransform } from '@angular/core';
import { TokenDetailsGeneric } from '../models/token.model';

@Pipe({
  name: 'filterText'
})
export class FilterTextPipe implements PipeTransform {

  transform(tokens: TokenDetailsGeneric[], ...args: any[]): any {
    return tokens.filter(c => c.token.toString().toLowerCase().indexOf(args[0]) !== -1);
  }

}
