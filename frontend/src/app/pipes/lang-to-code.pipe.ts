import { Pipe, PipeTransform } from '@angular/core';
import { LocaleSettingsService } from '../services/locale-settings.service';

@Pipe({
  name: 'langToCode'
})
export class LangToCodePipe implements PipeTransform {

  constructor(private localeSettingsService: LocaleSettingsService) { }

  transform(value: any, args?: any): any {
    return this.localeSettingsService.LANGMAP[value];
  }

}
