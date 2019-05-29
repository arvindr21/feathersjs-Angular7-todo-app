import { TestBed } from '@angular/core/testing';

import { LocaleSettingsService } from './locale-settings.service';

describe('LocaleSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocaleSettingsService = TestBed.get(LocaleSettingsService);
    expect(service).toBeTruthy();
  });
});
