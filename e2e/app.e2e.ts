import { browser, element, by } from 'protractor';

describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Angular PayPal DatePicker';
    expect(subject).toEqual(result);
  });
});
