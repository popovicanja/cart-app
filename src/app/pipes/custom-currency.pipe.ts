import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number,
            currencySign: string = '€',
            decimalLength: number = 2,
            chunkDelimiter: string = '.',
            decimalDelimiter: string = ',',
            chunkLength: number = 3): string {

    const result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')';
    const num = value.toFixed(Math.max(0, decimalLength));

    const replacedValue = (decimalDelimiter ? num.replace('.', decimalDelimiter) : num)
                          .replace(new RegExp(result, 'g'), '$&' + chunkDelimiter);

    return `${replacedValue} ${currencySign}`;
  }
}
